export const mockLatestLectures = {
  content: [
    {
      id: 2444,
      title: '물리학 1',
      instructor: '문송기',
      department: '물리·천문학부',
      course_number: '034.001',
      credit: 3,
      academic_year: '1학년',
      category: '과학적 사고와 실험',
      classification: '교양',
      taken_year: 2022,
      taken_semester: 2,
    },
    {
      id: 2512,
      title: '생물학',
      instructor: '이수연',
      department: '생명과학부',
      course_number: '034.029',
      credit: 3,
      academic_year: '1학년',
      category: '과학적 사고와 실험',
      classification: '교양',
      taken_year: 2022,
      taken_semester: 2,
    },
    {
      id: 33922,
      title: '컴퓨팅 기초: 처음 만나는 컴퓨팅',
      instructor: '김현주',
      department: '기초교육원',
      course_number: 'L0444.000400',
      credit: 3,
      academic_year: '1학년',
      category: '컴퓨터와 정보 활용',
      classification: '교양',
      taken_year: 2022,
      taken_semester: 2,
    },
    {
      id: 35530,
      title: '(공유)AI기초프로그래밍',
      instructor: '이정원',
      department: '혁신공유학부',
      course_number: 'M3500.000100',
      credit: 3,
      academic_year: '1학년',
      category: '',
      classification: '전선',
      taken_year: 2022,
      taken_semester: 1,
    },
    {
      id: 35754,
      title: '(공유)데이터 시각화',
      instructor: '박현우',
      department: '혁신공유학부',
      course_number: 'M3500.002400',
      credit: 3,
      academic_year: '1학년',
      category: '',
      classification: '전선',
      taken_year: 2022,
      taken_semester: 1,
    },
    {
      id: 35760,
      title: '(공유)에너지빅데이터분석',
      instructor: '윤용태',
      department: '혁신공유학부',
      course_number: 'M3500.005200',
      credit: 3,
      academic_year: '4학년',
      category: '',
      classification: '전선',
      taken_year: 2022,
      taken_semester: 1,
    },
  ],
  total_count: 6,
};

export const mockMainTags = {
  id: 1,
  name: 'main',
  ordering: -1,
  color: null,
  tags: [
    { id: 1, name: '최신', description: '최근 등록된 강의평', ordering: 1 },
    { id: 2, name: '추천', description: '학우들의 추천 강의', ordering: 2 },
  ],
};

export const mockMainEvaluations = [
  {
    id: 6260,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. LAST_TEST_TEXT',
    grade_satisfaction: 3,
    teaching_skill: 3,
    gains: 3,
    life_balance: 1,
    rating: 3,
    like_count: 0,
    dislike_count: 0,
    is_hidden: false,
    is_reported: false,
    from_snuev: false,
    year: 2016,
    semester: 1,
    lecture: { id: 353, title: '서양문명의 역사 1', instructor: '박재욱' },
    is_modifiable: true,
    is_reportable: false,
    user: {
      id: '630e3cb29382dc00102632a4',
      email: 'woohm402@snu.ac.kr',
      local_id: 'woohm402',
    },
  },
  {
    id: 6257,
    content: 'qwerqwerqwerqwerqwerqwerqwerqwerqwe',
    grade_satisfaction: 3,
    teaching_skill: 3,
    gains: 3,
    life_balance: 2,
    rating: 5,
    like_count: 0,
    dislike_count: 0,
    is_hidden: false,
    is_reported: false,
    from_snuev: false,
    year: 2020,
    semester: 1,
    lecture: { id: 2444, title: '물리학 1', instructor: '문송기' },
    is_modifiable: true,
    is_reportable: false,
    user: {
      id: '630e3cb29382dc00102632a4',
      email: 'woohm402@snu.ac.kr',
      local_id: 'woohm402',
    },
  },
  {
    id: 6254,
    content: 'sdfsfsdfsdfdsfdsfsdfsdfsdfsdfsdfsd',
    grade_satisfaction: 3,
    teaching_skill: 3,
    gains: 3,
    life_balance: 3,
    rating: 4,
    like_count: 0,
    dislike_count: 0,
    is_hidden: false,
    is_reported: false,
    from_snuev: false,
    year: 2019,
    semester: 3,
    lecture: {
      id: 15,
      title: '소그룹 고전원전읽기 1',
      instructor: 'Maria Claudia Macias Rodriguez',
    },
    is_modifiable: false,
    is_reportable: true,
    user: {
      id: '62b06d24b073f80011d3af74',
      email: 'mog2512@snu.ac.kr',
      local_id: 'yayaya',
    },
  },
];
