import React, { useEffect, useState } from 'react';
import { getAllInstitution } from '../Api/Institution.api';
import { Institution } from '../Model/Institution.model';

const Manager = () => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllInstitution();
      setInstitutions(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>רשימת מוסדות</h2>
      <ul>
        {institutions.map((institution) => (
          <li key={institution.id}>
            <p>שם מוסד: {institution.institutionName}</p>
            <p>סמל: {institution.symbol}</p>
            <p>מנהל: {institution.managerName}</p>
            <p>איש קשר: {institution.contactPerson}</p>
            <p>אימייל איש קשר: {institution.contactEmail}</p>
            <p>שם מפקח: {institution.inspectorName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Manager;
