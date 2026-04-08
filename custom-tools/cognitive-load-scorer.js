const tasks = query.split(',').map(t => t.trim());

const highLoadKeywords = ['research', 'write', 'study', 'analyze', 'create', 'design', 'plan', 'develop', 'finish', 'complete', 'exam', 'assignment', 'presentation']; 
const mediumLoadKeywords = ['review', 'update', 'prepare', 'organize', 'schedule', 'meet', 'call', 'read']; 
const urgencyKeywords = ['urgent', 'asap', 'today', 'due', 'deadline', 'immediately'];

const results = tasks.map(task => {
  let score = 3;
  const taskLower = task.toLowerCase();

  highLoadKeywords.forEach(k => { if(taskLower.includes(k)) score += 2; });
  mediumLoadKeywords.forEach(k => { if(taskLower.includes(k)) score += 1; });
  urgencyKeywords.forEach(k => { if(taskLower.includes(k)) score += 1; });


  score = Math.min(score, 10);
  
  const level = score >= 8 ? '🔴 High' : score >= 5 ? '🟡 Medium' : '🟢 Low';
  return `${task}: ${score}/10 (${level} cognitive load)`;


});


const avgScore = results.reduce((sum, r) => sum + parseInt(r.split(':')[1]), 0) / results.length;

const dailyLoad = avgScore >= 7 ? 'HIGH - Schedule demanding tasks in the morning' : avgScore >= 4 ? 'MODERATE - Balance your day evenly' : 'LOW - Good day for creative work';


return `COGNITIVE LOAD ANALYSIS:\n${results.join('\n')}\n\nOverall Daily Load: ${dailyLoad}`;