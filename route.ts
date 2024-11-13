import { NextRequest, NextResponse } from "next/server";
import { GetArticleIdProps } from "@/utils/typs";
import { UpdateArticleDto } from "@/utils/validation/dtos";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";


/**
 * @method GET
 * @route ~/api/articles/:articleId
 * @desc Get Single Article By Id
 * @access public
 */


export async function GET(request: NextRequest, { params }: GetArticleIdProps) {
    try {

        const article = await prisma.article.findUnique({
            where: { id: parseInt(params.articleId) },
            include: {
                comments: {
                    orderBy: {
                        createdAt: 'desc'
                    },
                    include: {
                        user: {
                            select: {
                                username: true,
                                isAdmin: true
                            }
                        }
                    }
                },
            }
        });
        if (!article) {
            return NextResponse.json({ message: "article not found" }, { status: 404 })
        }
        return NextResponse.json(article, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "internal server error" }, { status: 500 })
    }
}



/**
 * @method PUT
 * @route ~/api/articles/:articleId
 * @desc Update Article
 * @access private (only admin)
 */

export async function PUT(request: NextRequest, { params }: GetArticleIdProps) {
    try {
        const user = verifyToken(request)
        if (user === null || user.isAdmin === false) return NextResponse.json({ message: "Only admin" }, { status: 403 })
        const article = await prisma.article.findUnique({
            where: { id: parseInt(params.articleId) }
        })

        if (!article) {
            return NextResponse.json({ message: "article not found" }, { status: 404 })
        }

        const body = await request.json() as UpdateArticleDto
        const updatedArticle = await prisma.article.update({
            where: { id: parseInt(params.articleId) },
            data: {
                title: body.title,
                description: body.description
            }
        })
        return NextResponse.json(updatedArticle, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "internal server error" }, { status: 500 })
    }
}


/**
 * @method DELETE
 * @route ~/api/articles/:articleId
 * @desc Delete Article
 * @access private (only admin)
 */

export async function DELETE(request: NextRequest, { params }: GetArticleIdProps) {
    try {
        const user = verifyToken(request)
        if (user === null || user.isAdmin === false) return NextResponse.json({ message: "Only admin" }, { status: 403 })
        const article = await prisma.article.findUnique({
            where: { id: parseInt(params.articleId) },
            include: { comments: true }
        })
        if (!article) {
            return NextResponse.json({ message: "article not found" }, { status: 404 })
        }
        await prisma.article.delete({
            where: { id: parseInt(params.articleId) }
        })
        const commentIds: number[] = article?.comments.map(comment => comment.id)
        await prisma.comment.deleteMany({
            where: { id: { in: commentIds } }
        })
        return NextResponse.json({ message: "article deleted" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "internal server error" }, { status: 500 })

    }
}


