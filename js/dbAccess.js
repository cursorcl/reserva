
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
            scheduler.config.auto_end_date = true;
            scheduler.config.first_hour = 10;
            scheduler.config.last_hour = 18;
            scheduler.config.start_on_monday = true;
            scheduler.config.wide_form = true;
            
            scheduler.templates.event_class=function(start,end,event){
                if(event.text ==="LIBRE")
                {
                    return "red"
                }
                return event.color;
            }
            
            scheduler.templates.lightbox_header = function (start, end,
                    event) {
                return "DEFINIR HORA";
            }
            scheduler.config.icons_select = [ "icon_details", "icon_edit","icon_delete"];
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
                                        return "<div class='input-group'><input type='text' class='form-control' placeholder='Rut' name='search' style='margin-left:10px;'><div class='input-group-btn'><button class='btn btn-default' type='button' onClick='mybutton();'><i class='glyphicon glyphicon-search'></i></button></div></div>";
				},
				set_value:function(node, value, ev) {
					node.childNodes[0].value = value || "";
				},
				get_value:function(node, ev) {
					return node.childNodes[0].value;
				},
				focus:function(node) {
					var a = node.childNodes[0];
					a.select();
					a.focus();
				}
			};

                    scheduler.config.lightbox.sections = [
                        {name:"Rut", height:40, map_to:"rut", type:"my_editor" , focus:true},
                        {name: 'Paciente', map_to: "text", type: "textarea", height: 30},
                        {name: 'Fono', map_to: "telefono", type: "textarea", height: 30},
                        {name: 'Correo', map_to: "email", type: "textarea", height: 30},
                        {name: "Prevision", options: isapres, map_to: "combo_select", type: "combo", image_path: "../common/dhtmlxCombo/imgs/", height: 30, filtering: true},
                        {name: "Hora", height: 72, type: "time", map_to: "hora"},
                    ];
                    
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert(xhr.status);
                    alert(thrownError);
                    alert("-- " + xhr.responseText + " --");
                }
            });


            scheduler.attachEvent("onEventAdded", function (id){
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
                    parametros = {"id": id,"input_rut": searchRut, "fecha": fecha, "hora": hora, "id_doctor": id_doctor, "input_email": email, "input_phone": input_phone};
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
                        parametros = {"input_rut": searchRut, "fecha": fecha, "hora": hora, "id_doctor": id_doctor, "input_email": email, "input_phone": input_phone};
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
            var today =  new Date();
            scheduler.init('scheduler_here', today, "month");
            
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
                        $('#id_doctor').val(e.target.id);
                        var doctor_name = $(this).text();
                        $("#doctor_name").empty();
                        $("#doctor_name").append(doctor_name);
                        scheduler.clearAll();
                        
                        var day = today;
                        var ff = day.toLocaleString().split(" ");
                        $fecha = day .toISOString().slice(0,10);
                        $hora = ff[1];
                        $.ajax({
                            type: "GET",
                            url: "src/reserva/obtener_dias_libres_mes.php",
                            data: { "id_doctor": e.target.id, "fecha":$fecha, "hora": $hora, "id_sede": 1},
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (msg) {
                                var events = [];
                                var id = 1;
                                $.each(msg,function (index, item) {
                                    var start_date = new Date(item.fecha + "T"+item.horainicio+"Z");
                                    var s_init_date = moment(start_date).format("MM/DD/YYYY hh:mm:ss");
                                    
                                    var end_date = new Date(start_date);
                                    end_date.setMinutes(end_date.getMinutes() + 15);
                                    var s_end_date = moment(end_date).format("MM/DD/YYYY hh:mm:ss");
                                    
                                    var item1 = {"id": id,"text": "LIBRE","start_date": s_init_date,"end_date": s_end_date,"rut": "--","email": "--","telefono": "--" };
                                    events.push(item1);
                                    id++;
                                });
                                scheduler.parse(events,"json");
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
                            data: { "id_doctor": e.target.id},
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (msg) {
                                var events = [];
                                $.each(msg,function (index, item) {
                                    var item = {"id": item.id,"text": item.pacienteNombre,"start_date": item.fecha+ " "+ item.horainicio,"end_date": item.fecha+ " "+ item.horatermino,"rut": item.pacienteRut+ "-"+ item.pacienteDv,"email": item.pacienteEmail,"telefono": item.pacienteFono};
                                    events.push(item);
                                });
                                scheduler.parse(events,"json");
                                
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

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}


