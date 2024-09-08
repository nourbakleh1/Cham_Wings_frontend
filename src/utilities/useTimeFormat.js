
const useTimeFormat = (date) => {
    const format=new Date(date);
    const hours= `${format.getHours()}`.padStart(2, "0");
    const minutes=`${format.getMinutes()}`.padStart(2, "0");
    const formatDate=`${hours}:${minutes}:00`;
    return formatDate;
}

export default useTimeFormat