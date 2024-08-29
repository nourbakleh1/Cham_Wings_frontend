
const useDateFormat = (date) => {
    const format=new Date(date);
    const month = `${format.getMonth() + 1}`.padStart(2, "0");
    const formatDate=`${format.getFullYear()}-${month}-${format.getDate()}`;
    return formatDate;
}

export default useDateFormat