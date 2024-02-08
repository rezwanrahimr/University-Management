import { Schema, model } from "mongoose";
import { AcademicSemesterModel, IAcademicSemester } from "./academicSemester.interface";
import { academicSemesterCode, academicSemesterMonth, academicSemesterTitle } from "./academicSemester.constant";

const academicSemesterSchema = new Schema<IAcademicSemester>({
    title: { type: String, required: true, enum: academicSemesterTitle },
    year: { type: Number, required: true },
    code: { type: String, required: true, enum: academicSemesterCode },
    startMonth: { type: String, required: true, enum: academicSemesterMonth },
    endMonth: { type: String, required: true, enum: academicSemesterMonth },
});

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>('AcademicSemester', academicSemesterSchema);