import React from 'react';
import './AddTeacherReport.css';
export const AddTeacherReport = () => {
  
  return (
    <div className="report-form-wrapper">
    <form className="report-form">
      <label className='label' htmlFor="studentId">:שם התלמיד</label>
      <input id="studentId" type="text" name="studentId" />

      <label className='label' htmlFor="readingAndWritingSkills">:מיומנויות קריאה וכתיבה</label>
      <textarea id="readingAndWritingSkills" name="readingAndWritingSkills"></textarea>

      <label className='label' htmlFor="academicGap">:פערים לימודיים</label>
      <textarea id="academicGap" name="academicGap"></textarea>

      <label className='label' htmlFor="understandingOfTheMaterial">:הבנת החומר</label>
      <textarea id="understandingOfTheMaterial" name="understandingOfTheMaterial"></textarea>

      <label className='label' htmlFor="memory">:זכרון</label>
      <textarea id="memory" name="memory"></textarea>

      <label className='label' htmlFor="generalKnowledge">:ידע כללי</label>
      <textarea id="generalKnowledge" name="generalKnowledge"></textarea>

      <label className='label' htmlFor="motivation">:מוטיבציה</label>
      <textarea id="motivation" name="motivation"></textarea>

      <label className='label' htmlFor="vocabulary">:אוצר מילים</label>
      <textarea id="vocabulary" name="vocabulary"></textarea>

      <label className='label' htmlFor="academicAchievements">:הישגים לימודיים</label>
      <textarea id="academicAchievements" name="academicAchievements"></textarea>

      <label className='label' htmlFor="socialAndEmotionalConduct">:התנהלות חברתית ורגשית</label>
      <textarea id="socialAndEmotionalConduct" name="socialAndEmotionalConduct"></textarea>

      <label className='label' htmlFor="FamilyStatus">:מצב משפחתי</label>
      <select id="FamilyStatus" name="FamilyStatus">
        <option value="Single">Single</option>
        <option value="Married">Married</option>
        <option value="Divorced">Divorced</option>
        <option value="Widowed">Widowed</option>
        <option value="Separated">Separated</option>
      </select>

      <button type="submit">Submit Report</button>
    </form>
    </div>
  );
};
