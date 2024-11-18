const dueDateDiff = (dueDate: Date) => {
    const now = new Date();
    const timeDiff = new Date(dueDate).getTime() - now.getTime();
    
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(timeDiff / (1000 * 60));
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
  
    if (days === 0) {
      return "Due today";
    }
    if (days === 1) {
      return "Due tomorrow";
    }
    if (days > 1 && days <= 30) {
      return `Due in ${days} ${days > 1 ? "days" : "day"}`;
    }
    if (months === 1) {
      return "Due next month";
    }
    if (months > 1) {
      return `Due in ${months} ${months > 1 ? "months" : "month"}`;
    }
    if (timeDiff < 0) {
      return "Due date has passed";
    }
    return "Due soon";
  };
  
  export default dueDateDiff;
  