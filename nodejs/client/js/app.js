
class EventManager {
    constructor() {
        this.urlBase = "/events"
        this.inicializarFormulario()
        this.obtenerDataInicial()
        this.guardarEvento()
    }

    sessionError(){
      alert('Usuario no ha iniciado sesión')
      window.location.href = '//localhost:8082/index.html'
    }

    obtenerDataInicial() {
        let url = this.urlBase + "/all"
        $.get(url, (response) => {
          if(response == "logout" ){
            this.sessionError()
          }else this.inicializarCalendario(response);
        })
    }

    inicializarCalendario(eventos) {
        $('.calendario').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,basicDay'
            },
            //defaultDate: '2019-01-01',
            navLinks: true,
            editable: true,
            eventLimit: true,
            droppable: true,
            dragRevertDuration: 0,
            timeFormat: 'H:mm',
            eventDrop: (event) => {
                this.actualizarEvento(event)
            },
            events: eventos,
            eventDragStart: (event,jsEvent) => {
                $('.delete').find('img').attr('src', "img/trash-open.png");
                $('.delete').css('background-color', '#a70f19')
            },
            eventDragStop: (event,jsEvent) => {
                var trashEl = $('.delete');
                var ofs = trashEl.offset();
                var x1 = ofs.left;
                var x2 = ofs.left + trashEl.outerWidth(true);
                var y1 = ofs.top;
                var y2 = ofs.top + trashEl.outerHeight(true);
                if (jsEvent.pageX >= x1 && jsEvent.pageX<= x2 &&
                    jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
                        this.eliminarEvento(event)
                }

                $('.delete').find('img').attr('src', "img/delete.png");
              }
        })
    }

    guardarEvento() {
        $('.addButton').on('click', (event) => {
            event.preventDefault()
            let title = $('#titulo').val(),
                start = $('#start_date').val(),
                end = $('#start_date').val(),
                start_hour = '',
                end_hour = '',
                allDay = true;

            if (!$('#allDay').is(':checked')) {
                end = $('#end_date').val()
                start_hour = $('#start_hour').val()
                end_hour = $('#end_hour').val()
                start = start + 'T' + start_hour
                end = end + 'T' + end_hour
                allDay = false
            }

            if (title != "" && start != "") {

              let url = this.urlBase + "/new"
              let ev = {
                  title: title,
                  start: start,
                  end: end,
                  allDay: allDay
              }
              $.post(url, ev, (response) => {
                console.log(response);
                if(response=="OK"){
                  alert('Se ha añadido el evento exitosamente');

                  if (document.getElementById('allDay').checked) {
                    $('.calendario').fullCalendar('renderEvent', {
                      title: $('#titulo').val(),
                      start: $('#start_date').val(),
                      allDay: true
                    })
                  }else {
                    $('.calendario').fullCalendar('renderEvent', {
                      title: $('#titulo').val(),
                      start: $('#start_date').val()+" "+$('#start_hour').val(),
                      allDay: false,
                      end: $('#end_date').val()+" "+$('#end_hour').val()
                    })
                  }
                }else alert("Ocurrio un error al insertar el evento")
              })

            } else {
                alert("Complete los campos obligatorios para el evento")
            }
        })
    }

    eliminarEvento(evento) {
      let eventId = evento._id
      $.post('/events/delete/'+eventId, {id: eventId}, (response) => {
        if(response == "logout"){
          this.sessionError()
        }else{
          $('.calendario').fullCalendar('removeEvents', eventId);
          alert(response);
        }
      })
    }

    actualizarEvento(evento){
      let start = moment(evento.start).format('YYYY-MM-DD HH:mm:ss'),
          end = moment(evento.end).format('YYYY-MM-DD HH:mm:ss'),
          url = '/events/update/'+evento._id+'&'+start+'&'+end

      if(evento.allDay==true){
        url = '/events/update/'+evento._id+'&'+start+'&'+start;
      }

      let datos = {
          id: evento._id,
          start: start,
          end: end
      }
      $.post(url, datos, (response) => {
        if(response == "logout" ){
          this.sessionError()
        }else{
          alert(response)
        }
      })
    }

    inicializarFormulario() {
        $('#start_date, #titulo, #end_date').val('');
        $('#start_date, #end_date').datepicker({
            dateFormat: "yy-mm-dd"
        });
        $('.timepicker').timepicker({
            timeFormat: 'HH:mm:ss',
            interval: 30,
            minTime: '5',
            maxTime: '23:59:59',
            defaultTime: '',
            startTime: '5:00',
            dynamic: false,
            dropdown: true,
            scrollbar: true
        });
        $('#allDay').on('change', function(){
            if (this.checked) {
                $('.timepicker, #end_date').attr("disabled", "disabled")
            }else {
                $('.timepicker, #end_date').removeAttr("disabled")
            }
        })
    }

    logout(){
      var url = "/logout",
          data = "";
      $.post(url, data, (response) => {
          if(response == "logout"){
            window.location.href="http://localhost:8082/index.html"
          }else alert("Error al cerrar sesión")
      })
    }


}

$(function(){
  const Manager = new EventManager()

  $('#logout').on('click', function(){
    Manager.logout()
})
});
