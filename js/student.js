function emailIsValid(email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
function save() {
	let fullname = document.getElementById('fullname').value;
	let email = document.getElementById('email').value;
	let phone = document.getElementById('number').value;
	let address = document.getElementById('address').value;
	let gender = '';
	if (document.getElementById('male').checked) {
		gender = document.getElementById('male').value;
	} else if (document.getElementById('famale').checked) {
		gender = document.getElementById('famale').value;
	}
	if (_.isEmpty(fullname)) {
		fullname = '';
		document.getElementById('fullname-error').innerHTML = 'Vui long nhap ho va ten';
	} else if (fullname.length <= 2) {
		fullname = '';
		document.getElementById('fullname-error').innerHTML = 'Khong duoc nho hon 2 ky tu';
	} else {
		document.getElementById('fullname-error').innerHTML = '';
	}

	if(_.isEmpty(email)) {
		email = '';
		document.getElementById('email-error').innerHTML = 'Vui long nhap email';
	} else if(!emailIsValid(email)) {
		email = '';
		document.getElementById('email-error').innerHTML = 'Email khong dung dinh dang';
	} else {
		document.getElementById('email-error').innerHTML = '';
	}

	if(_.isEmpty(phone)) {
		phone = '';
		document.getElementById('phone-error').innerHTML = 'Vui long nhap so dien thoai';
	} else if (phone.trim().length > 10) {
		phone = '';
		document.getElementById('phone-error').innerHTML = 'So dien thoai khong dung';
	} else {
		document.getElementById('phone-error').innerHTML = '';
	}

	if(_.isEmpty(address)) {
		address = '';
		document.getElementById('address-error').innerHTML = 'Vui long nhap dia chi';
	} else {
		document.getElementById('address-error').innerHTML = '';
	}

	if(_.isEmpty(gender)) {
		gender = '';
		document.getElementById('gender-error').innerHTML = 'Vui long chon gioi tinh';
	} else {
		document.getElementById('gender-error').innerHTML = '';
	}

	if (fullname && email && phone && address && gender) {
		
		let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
		students.push({
			fullname: fullname,
			email: email,
			phone: phone,
			address: address,
			gender: gender
		});
		localStorage.setItem('students', JSON.stringify(students));
		this.renderListStudent();
	}
}
function renderListStudent()
{
	let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
	if (students.length === 0) {
		document.getElementById('list-student').style.display = 'none';
		return false;
	}
	document.getElementById('list-student').style.display = 'block';
	let tableContent = `<tr>
					<th>#</th>
					<th>Ho va ten</th>
					<th>Email</th>
					<th>Dien thoai</th>
					<th>Dia chi</th>
					<th>Gioi tinh</th>
					<th>Hanh dong</th>
				</tr>`;
	students.forEach((student, index) => {
			let studentId = index;
			let genderLabel = parseInt(student.gender) === 0 ? 'Nam' : 'Nu';
			index++;
			tableContent += `<tr>
					<td>${index}</td>
					<td>${student.fullname}</td>
					<td>${student.email}</td>
					<td>${student.phone}</td>
					<td>${student.address}</td>
					<td>${genderLabel}</td>
					<td>
						<a href="" onclick='deleteStudent(${studentId})'>Xoa</a>
					</td>
				</tr>`;
		})
 	document.getElementById('grid-students').innerHTML = tableContent;
}
function deleteStudent(id)
{
	let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
	students.splice(id, 1);
	localStorage.setItem('students', JSON.stringify(students));
	this.renderListStudent();
}