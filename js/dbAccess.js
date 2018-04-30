$().ready(function () {
    scheduler.init('scheduler_here', new Date(),"month");
    $.ajax({
        type: "POST",
        url: "src/doctors.php",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {

            var line = "";
            $.each(msg, function (index, item) {
                
                line = line + "<li><a href='#'>" + item.personalNombre+"</a></li>";
                
            });
            $("#homeSubmenu").append(line);
            //$("#cmbdoctor").get(0).options[$("#cmbdoctor").get(0).options.length] = new Option(item.personalNombre, item.personalId);

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
         theme: "minimal"
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