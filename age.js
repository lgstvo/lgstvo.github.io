function calcAge(birthday="2001-03-17") {
    const today = new Date();
    const birth = new Date(birthday);

    let age = today.getFullYear() - birth.getFullYear(); 
    const month = today.getMonth() - birth.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
        age--;
    }

    return age;
}

document.getElementById("contact-age").textContent = `Age: ${calcAge()}`;