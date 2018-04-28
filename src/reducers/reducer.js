import { combineReducers } from 'redux'; 

let first = [
	{nid: 1, lesson_name: "单片机", cla_name: "1571", student_name: "叶坤兴", student_id: "2015127001"},
	{nid: 2, lesson_name: "c语言", cla_name: "1572", student_name: "容铭业", student_id: "2015127051"}
			];

// 数据库的学生数据
const students = (state=first, action) => {
	switch(action.type){
		case "GET_STUDENTS": 
			state = action.students;
			return state;
		default: return state;
	}
}

// 当前班级的学生数据
const curStudents = (state=[], action) => {
	switch(action.type){
		case "SET_CUR_STUDENTS": 
			state = action.curStudents;
			return state;
		default: return state;
	}
}

// 目标课程
const lesson = (state='单片机', action) => {
	switch(action.type){
		case "SELECT_LESSON": 
			state = action.lesson;
			return state;
		default: return state;
	}
}

// 目标班级
const cla = (state='1571', action) => {
	switch(action.type){
		case "SELECT_CLA": state = action.cla; return state;
		default: return state;
	}
}

// 默认第一个课程
const defaultLesson = (state='true', action) => {
	switch(action.type){
		case "SET_DEFAULT_LESSEN": state = action.val; return state;
		default: return state;
	}
}

// 默认第一个班级
const defaultCla = (state='true', action) => {
	switch(action.type){
		case "SET_DEFAULT_CLA": state = action.val; return state;
		default: return state;
	}
}

// 目标课程，目标班级的 项目分析
const curProjects = (state=[], action) => {
	switch(action.type){
		case "GET_CUR_PROJECTS": 
			state = action.val;
			return state;
		default: return state;
	}
}

// 目标课程班级的项目
const setProjects = (state=[], action) => {
	switch(action.type){
		case "SET_PROJECTS": 
			state = action.val;
			return state;
		default: return state;
	}
}

// 点击的目标学生的项目
const targetStudentProjects = (state=[], action) => {
	switch(action.type){
		case "TARGET_STUDENT_PROJECTS":
			state = action.val;
			return state;
		default: return state;
	}
}

// 目标学生
const targetStudent = (state='', action) => {
	switch(action.type){
		case "TARGET_STUDENT":
			state = action.val;
			return state;
		default: return state;
	}
}


// 目标学生
const teacher = (state='', action) => {
	switch(action.type){
		case "SET_TEACHER":
			state = action.val;
			return state;
		default: return state;
	}
}

const reducer = combineReducers({
	cla,
	lesson,
	students,
	curStudents,
	defaultCla,
	defaultLesson,
	curProjects,
	setProjects,
	targetStudentProjects,
	targetStudent,
	teacher,
});

export default reducer;