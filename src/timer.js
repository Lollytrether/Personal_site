//Does not work
hours =  document.getElementsByClassName('hours_label')
minutes = document.getElementsByClassName('minutes_label')
seconds = document.getElementsByClassName('seconds_label')
milliseconds = document.getElementsByClassName('millisecond_label')
let i =0
function timer(){

    switch(hours){
        case 0:
            switch (minutes){
                case 0:
                    switch (seconds){
                        default:
                            while(i>0) {
                                while (i < seconds) {
                                    i++
                                }
                                document.getElementsByClassName("seconds").innerHTML = i.toString();
                            }
                            timer_end()
                            switch (milliseconds){
                                default:
                                    while(i>0) {
                                        while (i < milliseconds) {
                                            i++
                                        }
                                        document.getElementsByClassName("milliseconds").value= i.toString();
                                    }
                                    timer_end()

                            }
                    }
            }
    }
}