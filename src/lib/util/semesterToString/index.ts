import { Semester } from '@/lib/dto/semester';

export const semesterToString = (semester: Semester) => {
  switch (semester) {
    case 1:
      return '1';
    case 2:
      return '여름';
    case 3:
      return '2';
    case 4:
      return '겨울';
    default:
      return '';
  }
};
