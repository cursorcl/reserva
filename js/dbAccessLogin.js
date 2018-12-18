$(document).ready(function () {
    $("#btnsubmitlogin").click(function (e) {
        e.preventDefault();
        var name = $('#name').val();
        var clave = $('#current-password').val();
        var remember = $('#remember').val();
        $.ajax({
            type: "GET",
            url: "src/login/validate_login.php",
            data: {"username": name, "current-password": clave},
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                $("#error_username").empty();
                $("#error_password").empty();
                //Aqui debo agregar todos los doctores en el UL reserva-listadodoctores
                $.each(msg, function (index, item) {
                    if (item.result === "false")
                    {
                        $("#error_username").text(item.name_error);
                        $("#error_password").text(item.password_error);
                    } else
                    {
                        window.location.href = "/reserva/asindex.php";
                    }

                });
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
                alert("!! " + xhr.responseText + " !!");
            }
        });
    }
    );
});