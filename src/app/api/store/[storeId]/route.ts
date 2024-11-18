import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from "@/utils/verifyToken";
import prisma from "@/utils/db";

export type GetStoreIdProps = {
  params: { storeId: string };
};

export async function GET(
  request: NextRequest,
  context: GetStoreIdProps
) {
  try {
    const { storeId } = context.params; 

    const userPayload = verifyToken(request); 
    if (!userPayload) {
      return NextResponse.json(
        { message: "Sorry, you are not a user. Please sign in or create an account." },
        { status: 404 }
      );
    }

    const storeItem = await prisma.store.findUnique({
      where: { id: storeId },
      select: {
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        storeBanner: {
          select: {
            id: true,
            bannerTitle: true,
            bannerImage: true,
            bannerDescrip: true,
            height: true,
            titleColor: true,
            titleSize: true,
            descriptionColor: true,
            descriptionSize: true
          }
        },
        products: {
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            rating: true,
            sales: true,
            createdAt: true,
            updatedAt: true,
            images: true,
          },
        },
      },
    });

    if (!storeItem) {
      return NextResponse.json({ message: "No store found!" }, { status: 404 });
    }

    return NextResponse.json(storeItem, { status: 200 });
  } catch (error) {
    console.error("Error fetching store:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}




export async function DELETE(request: NextRequest, { params }: GetStoreIdProps) {
  try {
    const userPayload = verifyToken(request);
    if (userPayload === null) {
      return NextResponse.json({ message: "sorry you are not user please sign in or make account" }, { status: 404 });
    }
    const checkUserStore = await prisma.store.findFirst({ where: {userId: userPayload.id} })
    if(!checkUserStore){
      return NextResponse.json({message: "sorry this store not for you"}, {status: 400})
    }
    const store = await prisma.store.findUnique({
      where: { id: params.storeId },
      include: {
        products: {
          select: {
            id: true,
            images: {
              select: {
                id: true
              }
            }
          }
        }
      }
    });

    if (!store) {
      return NextResponse.json({ message: "Store not found" }, { status: 404 });
    }

    const imageIds = store.products.flatMap(product => product.images.map(image => image.id));

    await prisma.productImage.deleteMany({
      where: { id: { in: imageIds } }
    });

    const productIds = store.products.map(product => product.id);
    await prisma.product.deleteMany({
      where: { id: { in: productIds } }
    });

    await prisma.store.delete({ where: { id: params.storeId } });

    console.log(store);

    return NextResponse.json({ message: "Store has been deleted" }, { status: 200 });

  } catch (error) {
    console.error("Error details:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
