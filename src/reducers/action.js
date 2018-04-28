
// 设置老师
export const setTeacher = (val) => {
	return {
		type: "SET_TEACHER",
		val: val
	};
}

// 获取学生
export const getStudent = (students) => {
	return {
		type: "GET_STUDENTS",
		students: students
	};
}

// 选择目标课程
export const selectLesson = (lesson) => {
	return {
		type: "SELECT_LESSON",
		lesson: lesson
	};
}

// 选择目标班级
export const selectCla = (cla) => {
	return {
		type: "SELECT_CLA",
		cla: cla
	};
};

// 设置默认课程为第一个班
export const setDefaultLessson = (val) => {
	return {
		type: "SET_DEFAULT_LESSEN",
		val: val
	}
}

// 设置默认班级为第一个班
export const setDefaultCla = (val) => {
	return {
		type: "SET_DEFAULT_CLA",
		val: val
	}
}

// 设置目标课程班级的学生，要点击班级和第一次加载才有
export const setCurStudents = (val) => {
	return {
		type: "SET_CUR_STUDENTS",
		curStudents: val
	}
}

// 获取目标课程和目标班级的项目分析
export const getCurProjects = (val) => {
	return {
		type: "GET_CUR_PROJECTS",
		val: val
	};
}

// 获取目标课程和目标班级的设置项目
export const getSetProjects = (val) => {
	return {
		type: "SET_PROJECTS",
		val: val
	};
}

// 设置目标学生
export const setTargetStudent = (val) => {
	return {
		type: "TARGET_STUDENT",
		val: val
	};
}

// 设置目标学生的项目
export const setTargetStudentProjects = (val) => {
	return {
		type: "TARGET_STUDENT_PROJECTS",
		val: val
	};
}

