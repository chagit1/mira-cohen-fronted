export interface TeacherReport 
    {
          id:string,

          studentId:string,

          readingAndWritingSkills:string,

          academicGap:string,

          understandingOfTheMaterial:string,

          memory:string,

          generalKnowledge:string,

          motivation:string

          vocabulary:string,

          academicAchievements:string,

          socialAndEmotionalConduct:string,

          FamilyStatus:FamilyStatusEnum

}
 export enum FamilyStatusEnum{
    Single = "Single",
    Married = "Married",
    Divorced = "Divorced",
    Widowed = "Widowed",
    Separated = "Separated"
 }