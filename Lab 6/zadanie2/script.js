const formData = new FormData(document.querySelector('form'))


function checkFormat() {
    return document.getElementById("name").checkValidity() && document.getElementById("phone").checkValidity()
}


document.getElementById("add").onclick = function () {

    // build new entry

    const formData = new FormData(document.querySelector('form'))
    if (!checkFormat())
        return
    const name = formData.get("name");
    const phone = formData.get("phone");
    const section = document.createElement("section");
    
    const section_left = document.createElement('div');
    const section_left_h3 = document.createElement('h3');
    const section_left_p = document.createElement('p');

    section_left.classList.add('section-left');
    section_left_h3.textContent = name;
    section_left_p.textContent = phone;
    
    section_left.appendChild(section_left_h3);
    section_left.appendChild(section_left_p);
    section.appendChild(section_left);

    const section_right = document.createElement('div');
    section_right.classList.add("section-right");
    section_right.textContent = "🗑️"

    section_right.addEventListener('click', deleteEntry);
    section.appendChild(section_right);

    document.getElementById("adresy").appendChild(section);
}

function deleteEntry() {
    const parent = document.getElementById("adresy");
    const index = Array.from(parent.children).indexOf(this.parentNode);
    parent.removeChild(parent.children[index]);
}