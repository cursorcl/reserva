

function mybutton()
{
    var tmpRut = scheduler.formSection('Rut').getValue();
    if (validate(tmpRut))
    {
        var searchRut = clean(format(tmpRut));
        $.ajax({
            type: "GET",
            url: "src/reserva/obtener_paciente_x_rut.php",
            data: {"rut": searchRut},
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                $.each(msg, function (index, item) {
                    scheduler.formSection('Fono').setValue(item.phone);
                    scheduler.formSection('Paciente').setValue(item.name);
                    var paciente = scheduler.formSection("Paciente");
                    paciente.control.disabled = true;
                });
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
                alert("!! " + xhr.responseText + " !!");
            }
        });
    }
}
$().ready(
        function () {
            var step = 15;
            var isapres = [];
            scheduler.config.details_on_dblclick = true;
            scheduler.config.details_on_create = true;
            scheduler.config.hour_size_px = (60 / step) * 22;
            scheduler.config.event_duration = step;
            scheduler.config.time_step = step;
            scheduler.config.auto_end_date = true;
            scheduler.config.first_hour = 09;
            scheduler.config.last_hour = 20;
            scheduler.config.start_on_monday = true;
            scheduler.config.wide_form = true;
            scheduler.config.limit_time_select = true;
            scheduler.config.wide_form = false;

            scheduler.templates.event_class = function (start, end, event) {
                if (event.text === "LIBRE")
                {
                    return "red";
                }
                return event.color;
            };

            scheduler.templates.lightbox_header = function (start, end,
                    event) {
                return "DEFINIR HORA";
            };
            scheduler.config.icons_select = ["icon_details", "icon_edit", "icon_delete"];
            $.ajax({
                type: "POST",
                url: "src/reserva/obtener_instituciones.php",
                data: "{}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {

                    $.each(msg, function (index, item) {
                        var vkey = item.instCodigoTipo * 100 + item.instCodigo;
                        var d = {'key': vkey, 'label': item.instNombre};
                        isapres.push(d);
                    });
                    scheduler.form_blocks["my_editor"] = {
                        render: function (sns) {
                            return "<div class='input-group'><input type='text' class='form-control' placeholder='Rut' name='search' onfocusout='mybutton();' style='margin-right:2px;margin-left:10px;width=75%'><div class='input-group-btn' style='margin-left:2px;width=25%'><button class='btn btn-default' type='button' onClick='mybutton();'><i class='glyphicon glyphicon-search'></i></button></div></div>";
                        },
                        set_value: function (node, value, ev) {
                            node.childNodes[0].value = value || "";
                        },
                        get_value: function (node, ev) {
                            return node.childNodes[0].value;
                        },
                        focus: function (node) {
                            var a = node.childNodes[0];
                            a.select();
                            a.focus();
                        }
                    };

                    scheduler.config.lightbox.sections = [
                        {name: "Rut", height: 30, map_to: "rut", type: "my_editor", focus: true},
                        {name: 'Paciente', map_to: "text", type: "textarea", height: 30},
                        {name: 'Fono', map_to: "telefono", type: "textarea", height: 30},
                        {name: 'Correo', map_to: "email", type: "textarea", height: 30},
                        //{name: "Prevision", options: isapres, map_to: "combo_select", type: "combo", image_path: "../common/dhtmlxCombo/imgs/", height: 30, filtering: true}
                        {name: "Hora", height: 72, type: "time", map_to: "hora"},
                    ];

                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert(xhr.status);
                    alert(thrownError);
                    alert("-- " + xhr.responseText + " --");
                }
            });


            scheduler.attachEvent("onEventAdded", function (id) {
                var event = scheduler.getEvent(id);
                event.text = scheduler.formSection('Paciente').getValue();
                return true;
            });

            scheduler.attachEvent("onEventSave", function (id, ev,
                    is_new) {
                if (!ev.text) {
                    alert("El paciente no puede ser vacío");
                    return false;
                }
                return true;
            });

            scheduler.attachEvent('onEventAdded', function (id, event) {
                var tmpRut = scheduler.formSection('Rut').getValue();
                var input_phone = scheduler.formSection('Fono').getValue();
                var email = scheduler.formSection('Correo').getValue();
                var hora = event.start_date.toTimeString().slice(0, 8);
                var fecha = event.start_date.toISOString().slice(0, 10);
                var id_doctor = $("#id_doctor").val();
                if (validate(tmpRut))
                {
                    var searchRut = clean(format(tmpRut));
                    parametros = {"id": id, "input_rut": searchRut, "fecha": fecha, "hora": hora, "id_doctor": id_doctor, "input_email": email, "input_phone": input_phone};
                    $.ajax({
                        type: "GET",
                        url: "src/reserva/registrar_horas_para_paciente_sin_mail.php",
                        data: parametros,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (msg) {
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            alert(xhr.status);
                            alert(thrownError);
                            alert("!! " + xhr.responseText + " !!");
                        }
                    });

                }
            });

            scheduler.attachEvent('onEventChanged',
                    function (id, event) {
                        var tmpRut = scheduler.formSection('Rut').getValue();
                        var input_phone = scheduler.formSection('Fono').getValue();
                        var email = scheduler.formSection('Correo').getValue();
                        var hora = event.start_date.toTimeString().slice(0, 8);
                        var fecha = event.start_date.toISOString().slice(0, 10);
                        var id_doctor = $("#id_doctor").val();
                        if (validate(tmpRut))
                        {
                            var searchRut = clean(format(tmpRut));
                            parametros = {"id": id, "input_rut": searchRut, "fecha": fecha, "hora": hora, "id_doctor": id_doctor, "input_email": email, "input_phone": input_phone};
                            $.ajax({
                                type: "GET",
                                url: "src/reserva/registrar_horas_para_paciente_sin_mail.php",
                                data: parametros,
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                success: function (msg) {},
                                error: function (xhr, ajaxOptions, thrownError) {
                                    alert(xhr.status);
                                    alert(thrownError);
                                    alert("!! " + xhr.responseText + " !!");
                                }
                            });
                        }
                    });


            scheduler.attachEvent('onEventDeleted', function (id, event) {
                var hora = event.start_date.toTimeString().slice(0, 8);
                var fecha = event.start_date.toISOString().slice(0, 10);
                var id_doctor = $("#id_doctor").val();
                parametros = {"fecha": fecha, "hora": hora, "id_doctor": id_doctor};
                $.ajax({
                    type: "GET",
                    url: "src/reserva/borrar_horas_para_paciente_sin_mail.php",
                    data: parametros,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (msg) {},
                    error: function (xhr, ajaxOptions, thrownError) {
                        alert(xhr.status);
                        alert(thrownError);
                        alert("!! " + xhr.responseText + " !!");
                    }
                });

            });
            var today = new Date();
            scheduler.init('scheduler_here', today, "week");

        });
$(document).ready(function () {

    $("#sidebar").mCustomScrollbar({
        // theme: "minimal"
        theme: "dark"
    });
    $('#sidebarCollapse').on('click', function () {
        // open or close navbar
        $('#sidebar').toggleClass('active');
        // close dropdowns
        $('.collapse.in').toggleClass('in');
        // and also adjust aria-expanded attributes we use for the open/closed
        // arrows
        // in our CSS
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });

    var personalId = $("#personal_id").val();
    var rol = $("#rol").val();
    if (rol > 0)
    {
        scheduler.config.readonly = true;
        obtainOneDoctors(personalId);
    } else
    {
        scheduler.config.readonly = false;
        obtainDoctors();
    }
});

function formatDate(date) {
    var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}
function obtainOneDoctors($personalId)
{
    scheduler.clearAll();
    scheduler.unblockTime([0, 1, 2, 3, 4, 5, 6], [0, 24 * 60]);
    scheduler.updateView();
    $.ajax({
        type: "GET",
        url: "src/reserva/obtener_horas_base.php",
        data: {"personalId": $personalId},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            $.each(msg, function (index, item) {
                scheduler.blockTime({
                    days: item.day,
                    css: "red",
                    zones: [item.fini, item.fend]
                });
                scheduler.updateView();
            });

        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
            alert("-- " + xhr.responseText + " --");
        }
    });

    $.ajax({
        type: "GET",
        url: "src/doctors.php",
        data: {"personalId": $personalId},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            var line = "";
            $.each(msg, function (index, item) {
                //line = "<li><a href='' id='" + item.personalId + "'>" + item.personalNombre + "</a></li>";
                $("#homeSubmenu").append(line);
                $('#id_doctor').val(item.personalId);
                $("#doctor_name").empty();
                $("#doctor_name").append(item.personalNombre);
                var day = new Date();
                var ff = day.toLocaleString().split(" ");
                $fecha = day.toISOString().slice(0, 10);
                $hora = ff[1];
                $.ajax({
                    type: "GET",
                    url: "src/reserva/obtener_horas_reservadas_x_doctor.php",
                    data: {"id_doctor": item.personalId},
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (msg) {
                        $.each(msg, function (index, item) {
                            id = scheduler.addEvent({
                                id: item.id, 
                                text: item.pacienteNombre, 
                                start_date: item.fecha + " " + item.horainicio, 
                                end_date: item.fecha + " " + item.horatermino, 
                                rut: item.pacienteRut + "-" + item.pacienteDv, 
                                email: item.pacienteEmail, 
                                telefono: item.pacienteFono, 
                                color: 'gray', 
                                textColor: 'white'
                            });
                            scheduler.getEvent(id).readonly = true;
                        });
                        scheduler.updateView();
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
}



function obtainDoctors()
{
    scheduler.clearAll();
    scheduler.unblockTime([0, 1, 2, 3, 4, 5, 6], [0, 24 * 60]);
    scheduler.updateView();
    $.ajax({
        type: "GET",
        url: "src/doctors.php",
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            var line = "";
            $.each(msg, function (index, item) {
                line = line + "<li><a href='' id='" + item.personalId + "'>" + item.personalNombre + "</a></li>";

            });
            $("#homeSubmenu").empty();
            $("#homeSubmenu").append(line);
            $("#homeSubmenu li").click(function (e) {
                e.preventDefault();
                $('#id_doctor').val(e.target.id);
                var doctor_name = $(this).text();
                $("#doctor_name").empty();
                $("#doctor_name").append(doctor_name);
                scheduler.clearAll();
                scheduler.unblockTime([0, 1, 2, 3, 4, 5, 6], [0, 24 * 60]);
                scheduler.updateView();
                var day = new Date();
                var ff = day.toLocaleString().split(" ");
                $fecha = day.toISOString().slice(0, 10);
                $hora = ff[1];
                $.ajax({
                    type: "GET",
                    url: "src/reserva/obtener_horas_base.php",
                    data: {"personalId": e.target.id},
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (msg) {
                        $.each(msg, function (index, item) {
                            scheduler.blockTime({
                                days: item.day,
                                css: "blue",
                                zones: [item.fini, item.fend]
                            });
                        });
                        scheduler.updateView();

                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        alert(xhr.status);
                        alert(thrownError);
                        alert("-- " + xhr.responseText + " --");
                    }
                });


                $.ajax({
                    type: "GET",
                    url: "src/reserva/obtener_horas_reservadas_x_doctor.php",
                    data: {"id_doctor": e.target.id},
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (msg) {
                        var events = [];
                        $.each(msg, function (index, item) {
                            var item = {"id": item.id, "text": item.pacienteNombre, "start_date": item.fecha + " " + item.horainicio, "end_date": item.fecha + " " + item.horatermino, "rut": item.pacienteRut + "-" + item.pacienteDv, "email": item.pacienteEmail, "telefono": item.pacienteFono, color: "gray", textColor: "white"};
                            events.push(item);
                        });
                        scheduler.parse(events, "json");

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
}

/**
 * Aquí coloco todo lo que es limpieza de HMI
 * @returns {undefined}
 */
function disconnect()
{
    scheduler.clearAll();
    scheduler.unblockTime([0, 1, 2, 3, 4, 5, 6], [0, 24 * 60]);
    scheduler.updateView();
    $("#homeSubmenu").empty();
    $('#id_doctor').empty();
    $("#doctor_name").empty();
    //window.location = "http://localhost/reserva/index.php";
    window.location.href = "/reserva";
}