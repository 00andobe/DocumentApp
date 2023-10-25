import { dbQuery } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: number } }) {
    const { id }: any = params;
    const result = await dbQuery({
        sql: "SELECT * FROM posts WHERE id = ?",
        values: [parseInt(id)],
    });
    console.log(result);
    return NextResponse.json(result);
}

export async function PUT(req: Request, { params }: { params: { id: number } }) {
    const { id }: any = params;

    try {
        const body = await req.json();
        const { title, content } = body;
        const updateResult = await dbQuery({
            sql: "UPDATE posts SET title = ?, content = ? WHERE id = ?",
            values: [title, content, parseInt(id)],
        });

        return NextResponse.json({ message: "Post updated successfully" });
    } catch (error) {
        console.error("Error updating the post:", error);
        return NextResponse.error();
    }
}

export async function DELETE(req: Request, { params }: { params: { id: number } }) {
    const { id }: any = params;

    try {
        const deleteResult = await dbQuery({
            sql: "DELETE FROM posts WHERE id = ?",
            values: [parseInt(id)],
        });

       
            return NextResponse.json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting the post:", error);
        return NextResponse.error();
    }
}
