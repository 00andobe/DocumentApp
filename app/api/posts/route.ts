import { dbQuery } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
    const result = await dbQuery({
        sql: "SELECT * FROM posts",
        values: []
    });
    console.log(result);

    return NextResponse.json(result);
}

export async function POST(req: Request, res: Response) {
    try {
        const body = await req.json();
        const { author, title, content } = body;

        const insertResult = await dbQuery({
            sql: "INSERT INTO posts (author, title, content) VALUES (?, ?, ?)",
            values: [author, title, content]
        });

        if (insertResult && 'insertId' in insertResult) {
            const postId = insertResult.insertId;
            if (postId) {
                return NextResponse.json({ message: "Post created successfully", postId });
            } else {
                console.error("Failed to create the post");
                return NextResponse.error();
            }
        } else {
            console.error("Failed to create the post");
            return NextResponse.error();
        }
    } catch (error) {
        console.error("Error creating the post:", error);
        return NextResponse.error();
    }
}
