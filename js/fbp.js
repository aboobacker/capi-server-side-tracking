function event_id() {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    let result = timestamp + '.' + Math.floor((Math.random() * 99999999) + 1);
    return 'AB.'+result;
}