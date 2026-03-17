import { Schema, models, model } from "mongoose"
import { Document } from "mongoose"
import { IBookSegment } from "@/types"

const BookSegmentSchema = new Schema<IBookSegment>({
    clerkId: { type: String, required: true },
    bookId: { type: Schema.Types.ObjectId, required: true, ref: 'book', index : true},
    content: { type: String, required: true },
    segmentIndex: { type: Number, required: true, index:true },
    pageNumber: { type: Number , index:true},
    wordCount: { type: Number, required: true },
}, { timestamps: true });

BookSegmentSchema.index({bookId : 1, segmentIndex : 1}, {unique : true});
BookSegmentSchema.index({bookId:1, pageNumber : 1});
BookSegmentSchema.index({bookId : 1, content : 'text'});

const bookSegment = models.bookSegment || model<IBookSegment>('bookSegment', BookSegmentSchema);

export default bookSegment;