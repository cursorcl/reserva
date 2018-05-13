$().ready(function () {
    var step = 20;
    var format = scheduler.date.date_to_str("%H:%i");
    scheduler.config.details_on_dblclick = true;
    scheduler.config.details_on_create = true;
    scheduler.config.hour_size_px = (60 / step) * 22;
    scheduler.config.event_duration = step;
    scheduler.config.auto_end_date = true;
//    scheduler.templates.hour_scale = function (date) {
//        html = "";
//        for (var i = 0; i < 60 / step; i++) {
//            html += "<div style='height:22px;line-height:22px;'>" + format(date) + "</div>";
//            date = scheduler.date.add(date, step, "minute");
//        }
//        return html;
//    }
    scheduler.templates.lightbox_header = function (start, end, event) {
        return "Detalle para " + event.text;
    }

    scheduler.init('scheduler_here', new Date(), "month");
    $.ajax({
        type: "POST",
        url: "src/doctors.php",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {

            var line = "";
            $.each(msg, function (index, item) {
                line = line + "<li><a href='' id='" + item.personalId + "'>" + item.personalNombre + "</a></li>";
            });
            $("#homeSubmenu").append(line);
            
            $("#homeSubmenu li").click(function (e) {
                e.preventDefault();
                var doctor_name = $(this).text();
                $("#doctor_name").empty();
                $.ajax({
                    type: "GET",
                    url: "src/reserva/obtener_horas_reservadas_x_doctor.php",
                    data: {"id_doctor": e.target.id},
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (msg) {
                        scheduler.clearAll();
                        var events = [];
                        var id = 1;
                        $.each(msg, function (index, item) {
                            var item = {"id": id, "text": item.pacienteNombre, "start_date": item.fecha + " " + item.horainicio, "end_date": item.fecha + " " + item.horatermino, "rut": item.pacienteRut + "-" + item.pacienteDv, "email": item.pacienteEmail, "telefono": item.pacienteFono};
                            events.push(item);
                            id++;
                        });
                        scheduler.parse(events, "json"); //takes the name and format of the data source
                        $("#doctor_name").append(doctor_name)
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        alert(xhr.status);
                        alert(thrownError);
                        alert("-- " + xhr.responseText + " --");
                    }
                });


            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
            alert("-- " + xhr.responseText + " --");
        }
    });
});


$(document).ready(function () {

    $("#sidebar").mCustomScrollbar({
//theme: "minimal"
        theme: "dark"
    });
    $('#sidebarCollapse').on('click', function () {
// open or close navbar
        $('#sidebar').toggleClass('active');
        // close dropdowns
        $('.collapse.in').toggleClass('in');
        // and also adjust aria-expanded attributes we use for the open/closed arrows
        // in our CSS
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
});