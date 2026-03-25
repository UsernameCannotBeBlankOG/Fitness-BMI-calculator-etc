document.addEventListener('DOMContentLoaded', function() {
  const bmiForm = document.querySelector('.calculate-form');
  const heightInput = document.getElementById('height');
  const weightInput = document.getElementById('weight');
  const ageInput = document.getElementById('age');
  const genderSelect = document.getElementById('gender');
  const activitySelect = document.getElementById('activity-factor');
  const resultDiv = document.getElementById('bmi-result');

  function getBMICategory(bmi) {
    if (bmi < 18.5) return 'Underweight';
    if (bmi >= 18.5 && bmi <= 24.9) return 'Healthy';
    if (bmi >= 25.0 && bmi <= 29.9) return 'Overweight';
    if (bmi >= 30.0) return 'Obese';
    return 'Unknown';
  }

  bmiForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const heightCm = parseFloat(heightInput.value);
    const weightKg = parseFloat(weightInput.value);
    const age = parseInt(ageInput.value, 10);
    const gender = genderSelect.value;
    const activity = activitySelect.value;

    if (isNaN(heightCm) || heightCm <= 0) {
      resultDiv.textContent = 'Please enter a valid height (cm).';
      return;
    }
    if (isNaN(weightKg) || weightKg <= 0) {
      resultDiv.textContent = 'Please enter a valid weight (kg).';
      return;
    }
    if (isNaN(age) || age < 0) {
      resultDiv.textContent = 'Please enter a valid age.';
      return;
    }
    if (!gender) {
      resultDiv.textContent = 'Please select your gender.';
      return;
    }
    if (!activity) {
      resultDiv.textContent = 'Please select an activity factor.';
      return;
    }

    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    const bmiRounded = bmi.toFixed(1);
    const category = getBMICategory(bmi);

    resultDiv.innerHTML = `
      <strong>Your BMI: ${bmiRounded}</strong><br>
      Category: ${category}<br>
      <small>Based on WHO classification.</small>
    `;

    const tableRows = document.querySelectorAll('.calculate-table tbody tr');
    tableRows.forEach(row => row.style.backgroundColor = 'transparent');

 
    let targetRow = null;
    if (bmi < 18.5) targetRow = tableRows[0];
    else if (bmi >= 18.5 && bmi <= 24.9) targetRow = tableRows[1];
    else if (bmi >= 25.0 && bmi <= 29.9) targetRow = tableRows[2];
    else if (bmi >= 30.0) targetRow = tableRows[3];

    if (targetRow) {
      targetRow.style.backgroundColor = 'rgba(255,255,255,0.1)';
    }
  });
});

let currentLoad = 45;

function generateRandomLoad() {
    const hour = new Date().getHours();
    let baseLoad;
    if (hour < 6) baseLoad = 10 + Math.random() * 15;      
    else if (hour < 9) baseLoad = 20 + Math.random() * 20; 
    else if (hour < 12) baseLoad = 40 + Math.random() * 25;
    else if (hour < 15) baseLoad = 65 + Math.random() * 20; 
    else if (hour < 18) baseLoad = 55 + Math.random() * 25;
    else if (hour < 21) baseLoad = 70 + Math.random() * 20; 
    else if (hour < 23) baseLoad = 40 + Math.random() * 25;
    else baseLoad = 15 + Math.random() * 20;
    return Math.min(100, Math.max(0, Math.floor(baseLoad)));
}

function updateLoadDisplay() {
    const fillElem = document.getElementById('single-bar-fill');
    const percentElem = document.getElementById('single-bar-percent');
    const currentLoadElem = document.getElementById('current-load');
    const timeElem = document.getElementById('single-bar-time');
    if (!fillElem) return;

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    if (timeElem) timeElem.textContent = `${hours}:${minutes}`;

    fillElem.style.height = `${currentLoad}%`;
    if (percentElem) percentElem.textContent = `${currentLoad}%`;
    if (currentLoadElem) currentLoadElem.textContent = `${currentLoad}%`;
}

function startLiveLoad() {
    currentLoad = generateRandomLoad();
    updateLoadDisplay();

    setInterval(() => {
        let change = (Math.random() - 0.5) * 12; // 
        let newLoad = currentLoad + change;
        newLoad = Math.min(100, Math.max(0, newLoad));
        currentLoad = Math.floor(newLoad);
        updateLoadDisplay();
    }, 10000);
}

if (document.getElementById('single-bar-fill')) {
    startLiveLoad();
}