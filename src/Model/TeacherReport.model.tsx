export interface TeacherReport {
    id: string;
    studentId: string;
    readingAndWritingSkills: string;
    academicGap: string;
    understandingOfTheMaterial: string;
    memory: string;
    generalKnowledge: string;
    motivation: string;
    vocabulary: string;
    academicAchievements: string;
    socialAndEmotionalConduct: string;
    familyStatus : FamilyStatus;
}

export enum FamilyStatus {
    Married,
    Divorced,
    Widow
}