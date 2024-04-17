
const extractTime = (createdAt) => {
const createdAtTime = new Date(createdAt); // Example createdAt time

const hours = createdAtTime.getHours();
const minutes = createdAtTime.getMinutes();

const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

return formattedTime;
}

export default extractTime