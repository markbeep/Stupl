import { SubjectData, SubjectGroup } from "../data";

// function that checks if a certain subject should be included in calculations
export const showSubject = (
  includePlanned: boolean,
  subjectTableRowData: SubjectData
) => {
  return includePlanned ? true : subjectTableRowData.planned ? false : true;
};

//compute sum of ECTS per category (that are to be included based on includePlanned)
export const sumEcts = (
  includePlanned: boolean,
  subjectGroup: SubjectGroup
) => {
  return subjectGroup.data.reduce((accumulator, currentValue) => {
    return (
      accumulator +
      (showSubject(includePlanned, currentValue) ? currentValue.ects : 0)
    );
  }, 0);
};

//compute the weigthed sum of grades * ECTS per category
export const wsumGrades = (
  includePlanned: boolean,
  subjectGroup: SubjectGroup
) => {
  return subjectGroup.data.reduce((accumulator, currentValue) => {
    return (
      accumulator +
      (showSubject(includePlanned, currentValue)
        ? currentValue.grade * currentValue.ects
        : 0)
    );
  }, 0);
};

//compute the average grade based one includePlanned per category
export const avgGrades = ({
  includePlanned,
  subjectGroup,
}: {
  includePlanned: boolean;
  subjectGroup: SubjectGroup;
}) => {
  if (Number(sumEcts(includePlanned, subjectGroup)) === 0) {
    return 0;
  } else {
    return (
      wsumGrades(includePlanned, subjectGroup) /
      sumEcts(includePlanned, subjectGroup)
    ).toFixed(2);
  }
};

//compute total credits
export const totalCredits = (
  includePlanned: boolean,
  subjectGroups: SubjectGroup[]
) => {
  {
    return Number(
      subjectGroups.reduce((accumulator, currentValue) => {
        return accumulator + Number(sumEcts(includePlanned, currentValue));
      }, 0)
    );
  }
};

//compute the total sum of weighted grades
export const totalWsum = (
  includePlanned: boolean,
  subjectGroups: SubjectGroup[]
) => {
  {
    return Number(
      subjectGroups.reduce((accumulator, currentValue) => {
        return accumulator + Number(wsumGrades(includePlanned, currentValue));
      }, 0)
    );
  }
};
