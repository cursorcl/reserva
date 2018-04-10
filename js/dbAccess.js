function init() {
    scheduler.config.multi_day = true;
    scheduler.config.xml_date = "%Y-%m-%d %H:%i";
    scheduler.init('scheduler_here', new Date(2018, 0, 1), "week");
    //scheduler.load("./data/events.xml");

}

$().ready(function () {
    init();
});

