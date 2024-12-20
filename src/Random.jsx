export const generateTodos = (n = 5000) => {
  const todos = [];
  for (let i = 0; i < n; i++) {
    todos.push(generateTodo());
  }
  return todos;
};

const generateTodo = () => ({
  done: Math.random() > 0.5,                    
  name: getRandomString(),                        
  description: getRandomDescription(),            
  importance: getRandomImportance(),              
  id: Date.now() + Math.random().toString(36),  
});


const getRandomString = () => 
  Math.random().toString(36).substring(2, 15);   


const getRandomDescription = () => {
  const descriptions = [
    "This is a sample description for the task.",
    "Another description to provide context.",
    "Don't forget to check this task!",
    "A quick note about this task.",
    "Reminder for this task.",
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};


const getRandomImportance = () => {
  const importances = ['low', 'medium', 'high'];
  return importances[Math.floor(Math.random() * importances.length)];
};
