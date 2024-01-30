import { z } from "zod";

const createAcademicSemesterZodSchema = z.object({
    body: z.object({
        user: z.object({
            title: z.enum(['Autumn', 'Summer', 'Fall'], { required_error: 'Title is Require' }),
            year: z.number({ required_error: 'Year is Require' }),
            code: z.string({ required_error: 'Code is Require' }),
            startMonth: z.enum(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], { required_error: 'Start-Month is Require' }),
            endMonth: z.enum(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], { required_error: 'End-Month is Required' })
        })
    })
})

export const AcademicSemesterValidation = { createAcademicSemesterZodSchema };