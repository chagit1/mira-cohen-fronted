import { Student } from "./Student.model";

export interface HelpHours extends Student {
    strengthAreas: string,
    areasForImprovement: string,
    academicAchievements: string
}
