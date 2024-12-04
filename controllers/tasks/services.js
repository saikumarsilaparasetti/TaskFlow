const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../data/tasks.json');

// Read data from the JSON file
function readData() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data); // Convert JSON string to JavaScript object
  } catch (err) {
    console.error('Error reading data:', err);
    return [];
  }
}

// Write data to the JSON file
function writeData(data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2)); // Pretty-print JSON
    console.log('Data written successfully!');
  } catch (err) {
    console.error('Error writing data:', err);
  }
}

// Example: Add a new item
function addTask(newTask) {
  const data = readData(); // Read current data
  data.push(newTask);      // Add new item
  writeData(data);         // Save back to the file
  return data;
}

// Update a task by ID
function updateTaskById(id, updatedTask) {
  const data = readData(); // Read current data

  // Find the index of the task with the given ID
  const taskIndex = data.findIndex(task => task.id === id);

  if (taskIndex === -1) {
    console.error(`Task with ID ${id} not found.`);
    return null;
  }

  // Update the task while keeping existing fields not in updatedTask
  data[taskIndex] = { ...data[taskIndex], ...updatedTask };

  // Write the updated data back to the file
  writeData(data);
  console.log(`Task with ID ${id} updated successfully!`);

  return data[taskIndex]; // Return the updated task
}


function deleteTaskById(id) {
  const data = readData(); // Read current data

  // Filter out the task with the given ID
  const filteredData = data.filter(task => task.id !== id);

  if (filteredData.length === data.length) {
    console.error(`Task with ID ${id} not found.`);
    return null;
  }

  // Write the updated data back to the file
  writeData(filteredData);
  console.log(`Task with ID ${id} deleted successfully!`);

  return filteredData; // Return the updated list of tasks
}


module.exports = {
  readData,
  addTask,
  updateTaskById,
  deleteTaskById
};

