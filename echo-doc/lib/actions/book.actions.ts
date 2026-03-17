'use server'

import { connectToDatabase } from "@/database/mongoose";
import { CreateBook, TextSegment } from "@/types";
import { generateSlug, serializeData } from "../utils";
import book from "@/database/models/book.model";
import bookSegment from "@/database/models/booksegment.model";


export const checkBookExists = async(title:string) => {
    try{
        await connectToDatabase();
        const slug = generateSlug(title);
        const existingBook = await book.findOne({slug}).lean();
        if(existingBook){
            return{
                exists:true, book:serializeData(existingBook)
            }
        }
        return{
            exists:false,
        }
    }catch(e){
        console.error("error checking book exists,", e);
        return{
            exists:false,error:e
        }
    }
}

export const createBook = async (data: CreateBook) => {
    try {
        await connectToDatabase();
        const slug = generateSlug(data.title);

        const existingBook = await book.findOne({ slug }).lean();
        if (existingBook) {
            return {
                success: true,
                data: JSON.parse(JSON.stringify(existingBook)),
                alreadyExists: true,
            }
        }

        // check subscription limits before creating a book

        const Book = await book.create({ ...data, slug, totalSegments: 0 });
        return {
            success: true,
            data: serializeData(book),
        }
    }
    catch (e) {
        console.log('error creating book', e);
        return {
            success: false,
            error: e
        }
    }
}

export const saveBookSegments = async (bookId: string, clerkId: string, segments: TextSegment[]) => {
    try {
        await connectToDatabase();
        console.log('saving book segments');
        const segmentsToInsert = segments.map(({text, segmentIndex, pageNumber, wordCount}) => ({
            clerkId, bookId, content: text, segmentIndex, pageNumber, wordCount
        }));
        await bookSegment.insertMany(segmentsToInsert);
        await book.findByIdAndUpdate(bookId, {totalSegments:segments.length});
        console.log('book segments saved successfully');

        return {
            success:true,
            data:{segmentsCreated:segments.length}
        }

    }
    catch (e) {
        console.error('Error saving book segments', e);
        await bookSegment.deleteMany({ bookId });
        await book.findByIdAndDelete(bookId);
        console.log('deleted book segments and book due to failure of some segments');
    }
}


