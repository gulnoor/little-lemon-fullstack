const availableTimesByDate = {
  '2023-08-29': ['10:00', '11:00', '12:00'],
  '2023-09-01': ['10:00', '11:00', '12:00'],
  '2023-09-02': ['14:00', '15:00', '16:00'],
  '2023-09-03': ['10:00', '11:00', '12:00'],
  '2023-09-04': ['14:00', '15:00', '16:00'],
  '2023-09-05': ['10:00', '11:00', '12:00'],
  '2023-09-06': ['14:00', '15:00', '16:00'],
  '2023-09-07': ['10:00', '11:00', '12:00'],
  '2023-09-08': ['14:00', '15:00', '16:00'],
  '2023-09-09': ['10:00', '11:00', '12:00'],
  '2023-09-10': ['14:00', '15:00', '16:00'],
  '2023-09-11': ['10:00', '11:00', '12:00'],
  '2023-09-12': ['14:00', '15:00', '16:00'],
  '2023-09-13': ['10:00', '11:00', '12:00'],
  '2023-09-14': ['14:00', '15:00', '16:00'],
  '2023-09-15': ['10:00', '11:00', '12:00'],
  '2023-09-16': ['14:00', '15:00', '16:00'],
  '2023-09-17': ['10:00', '11:00', '12:00'],
  '2023-09-18': ['14:00', '15:00', '16:00'],
  '2023-09-19': ['10:00', '11:00', '12:00'],
  '2023-09-20': ['14:00', '15:00', '16:00'],
  "":[],
  "1": ["9:00", "9:15", "9:30", "9:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15"],
  "2": ["11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "1:00", "1:15", "1:30", "1:45"],
  "3": ["2:00", "2:15", "2:30", "2:45", "3:00", "3:15", "3:30", "3:45", "4:00", "4:15"],
  "4": ["4:30", "4:45", "5:00", "5:15", "5:30", "5:45", "6:00", "6:15", "6:30", "6:45"],
  "5": ["7:00", "7:15", "7:30", "7:45", "8:00", "8:15", "8:30", "8:45", "9:00", "9:15"],
  "6": ["9:30", "9:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45"],
  "7": ["12:00", "12:15", "12:30", "12:45", "1:00", "1:15", "1:30", "1:45", "2:00", "2:15"]
};


const fetchAPI = (date) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randIndex = Math.floor(Math.random() * 7)+1
      if (availableTimesByDate[date]) {
        resolve(availableTimesByDate[date])
      }
      else {
        reject(availableTimesByDate[randIndex]);
      }
    }, 1000)
  })
}

const submitAPI = (formData) => {


  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (formData
        && formData.date
        && formData.time
        && availableTimesByDate[formData.date].includes(formData.time)) {
        availableTimesByDate[formData.date] = availableTimesByDate[formData.date].filter(time => time !== formData.time);
        resolve(true); // Simulate successful submission
      } else {
        reject(new Error('Form submission failed.'));
      }
    }, 1000); // Simulate API delay
  });
};

export { fetchAPI, submitAPI }