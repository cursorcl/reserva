
function mybutton()
{
    alert("RUT");
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
                        scheduler.formSection('paciente').setValue(item.name);
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
            var step = 20;
            var isapres = [];
            scheduler.config.details_on_dblclick = true;
            scheduler.config.details_on_create = true;
            scheduler.config.hour_size_px = (60 / step) * 22;
            scheduler.config.event_duration = step;
            scheduler.config.auto_end_date = true;
            scheduler.config.first_hour = 8;
            scheduler.config.last_hour = 17;
            scheduler.config.start_on_monday = true;
            scheduler.config.wide_form = true;
            scheduler.templates.lightbox_header = function (start, end,
                    event) {
                return "DEFINIR HORA";
            }
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
				render:function(sns) {
					//return "<div class='form-group'><label for='rut'>Rut:</label><input type='text' class='form-control' id='rut'></div><button type='button' onClick='mybutton();' class='btn btn-success '><span class='glyphicon glyphicon-search'></span> Buscar</button>";
                                        
                                        return "<div class='input-group'><input type='text' class='form-control' placeholder='Rut' name='search' style='margin-left:10px;'><div class='input-group-btn'><button class='btn btn-default' type='button' onClick='mybutton();'><i class='glyphicon glyphicon-search'></i></button></div></div>";
				},
				set_value:function(node, value, ev) {
					node.childNodes[0].value = value || "";
					//node.childNodes[4].value = ev.details || "";
				},
				get_value:function(node, ev) {
					ev.details = node.childNodes[0].value;
					//return node.childNodes[1].value;
				},
				focus:function(node) {
					var a = node.childNodes[0];
					a.select();
					a.focus();
				}
			};

                    scheduler.config.lightbox.sections = [
                        {name:"Rut", height:40, map_to:"rut", type:"my_editor" , focus:true},
                        {name: 'Paciente', map_to: "paciente", type: "textarea", height: 30},
                        {name: 'Fono', map_to: "fono", type: "textarea", height: 30},
                        {name: 'Correo', map_to: "email", type: "textarea", height: 30},
                        {name: "Prevision", options: isapres, map_to: "prevision", type: "combo", image_path: "../common/dhtmlxCombo/imgs/", height: 30, filtering: true},
                        {name: "Hora", height: 72, type: "time", map_to: "hora"},
                    ];
                    
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert(xhr.status);
                    alert(thrownError);
                    alert("-- " + xhr.responseText + " --");
                }
            });




            scheduler.attachEvent("onEventSave", function (id, ev,
                    is_new) {
                if (!ev.paciente) {
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


                parametros = {"input_rut": searchRut, "fecha": fecha, "hora": hora, "id_doctor": id_doctor, "input_email": email, "input_phone": input_phone};
                if (validate(tmpRut))
                {
                    var searchRut = clean(format(tmpRut));





                    $.ajax({
                        type: "GET",
                        url: "src/reserva/registrar_horas_para_paciente.php",
                        data: parametros,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (msg) {
                            //Aqui debo verificar que fue almacenado exitosamente o fallidamente
                            if (msg === "exito")
                            {
                                show_simple_modal("success", "Reserva de hora", "Su hora ha sido reservada exitosamente.", function (result) {
                                    $("#reserva-form-usuario").submit();
                                    return true;
                                });
                            } else
                            {
                                show_simple_modal("error ", "Reserva de hora", "Su hora no ha sido reservada exitosamente.", function (result) {
                                    $("#reserva-form-usuario").submit();
                                    return true;
                                });
                            }
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
                        // eventService.update(event);
                        alert("UPDATE");
                    });
            scheduler.attachEvent('onEventDeleted', function (id) {
                // eventService.delete(id);
                alert("DELETE");
            });
            scheduler.init('scheduler_here', new Date(), "month");
            $
                    .ajax({
                        type: "POST",
                        url: "src/doctors.php",
                        data: "{}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (msg) {

                            var line = "";
                            $.each(msg, function (index, item) {
                                line = line + "<li><a href='' id='"
                                        + item.personalId + "'>"
                                        + item.personalNombre
                                        + "</a></li>";
                            });
                            $("#homeSubmenu").append(line);
                            $("#homeSubmenu li")
                                    .click(
                                            function (e) {
                                                $('#id_doctor').val(e.target.id);

                                                e.preventDefault();
                                                var doctor_name = $(
                                                        this).text();
                                                $("#doctor_name")
                                                        .empty();
                                                $
                                                        .ajax({
                                                            type: "GET",
                                                            url: "src/reserva/obtener_horas_reservadas_x_doctor.php",
                                                            data: {
                                                                "id_doctor": e.target.id
                                                            },
                                                            contentType: "application/json; charset=utf-8",
                                                            dataType: "json",
                                                            success: function (
                                                                    msg) {
                                                                scheduler
                                                                        .clearAll();
                                                                var events = [];
                                                                var id = 1;
                                                                $
                                                                        .each(
                                                                                msg,
                                                                                function (
                                                                                        index,
                                                                                        item) {
                                                                                    var item = {
                                                                                        "id": id,
                                                                                        "text": item.pacienteNombre,
                                                                                        "start_date": item.fecha
                                                                                                + " "
                                                                                                + item.horainicio,
                                                                                        "end_date": item.fecha
                                                                                                + " "
                                                                                                + item.horatermino,
                                                                                        "rut": item.pacienteRut
                                                                                                + "-"
                                                                                                + item.pacienteDv,
                                                                                        "email": item.pacienteEmail,
                                                                                        "telefono": item.pacienteFono
                                                                                    };
                                                                                    events
                                                                                            .push(item);
                                                                                    id++;
                                                                                });
                                                                scheduler
                                                                        .parse(
                                                                                events,
                                                                                "json"); // takes
                                                                // the
                                                                // name
                                                                // and
                                                                // format
                                                                // of
                                                                // the
                                                                // data
                                                                // source
                                                                $(
                                                                        "#doctor_name")
                                                                        .append(
                                                                                doctor_name)
                                                            },
                                                            error: function (
                                                                    xhr,
                                                                    ajaxOptions,
                                                                    thrownError) {
                                                                alert(xhr.status);
                                                                alert(thrownError);
                                                                alert("-- "
                                                                        + xhr.responseText
                                                                        + " --");
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
});


