//Create an on focus event for the nav buttons to highlight in some way when hovered/focused


//Chart Button Events:
$(document).ready( function(){
    console.log("ready");
    //-------SIGN IN PAGE STUFF-----


    //------------------------------
    profilePic = $('#profilePicture');
    username = $('#username');
    profilePic.keypress(function(e){
        if(e.which == 13) {
            window.location.href = 'signUp.html';
        }
    });
    username.keypress(function(e){
        if(e.which == 13) {
            window.location.href = 'signUp.html';
        }
    });



    addWeightButton = $('#addWeightButton');
    addWeightPopup = $('.addWeightPopup');
    addWeightEnterBtn = $('#addWeightEnter');
    addWeightCancelBtn = $('#addWeightCancel');
    addWeightUndoBtn = $('#addWeightUndo');
    weightInputField = $('#weightNum');

    addWeightButton.click(function(){
        if(addWeightPopup.css('display')=='none'){
            addWeightPopup.css('display', 'block');
        } else{
            addWeightPopup.css('display', 'none');
        }
    });
    addWeightEnterBtn.click(function(){ //Will add weight under today's date
        if(weightInputField.val() == ''){
            alert("Please Input A Valid Weight");
        }else{
            weightVal = weightInputField.val();
            const date = new Date();
            string = date.toDateString(); //"Wed Apr 12 2023"
            newDate = string.slice(4, 10);
            addData(weightChart, newDate, weightVal);
            updateScales(weightChart);

            addWeightPopup.css('display', 'none');
            weightInputField.val('')
        }
    });
    addWeightCancelBtn.click(function(){
        weightInputField.val('');
        addWeightPopup.css('display', 'none');
    });
    addWeightUndoBtn.click(function(){
        removeData(weightChart);
    });

    benchButton = $('#benchButton');
    benchOverlay = $('#benchMax');
    squatButton = $('#squatButton');
    squatOverlay = $('#squatMax');
    deadliftButton = $('#deadliftButton');
    deadliftOverlay = $('#deadliftMax');

    squatButton.click(function(){
        if(benchOverlay.css('display') != 'none'){
            benchOverlay.css('display', 'none');
        }
        if(deadliftOverlay.css('display') != 'none'){
            deadliftOverlay.css('display', 'none');
        }
        if(squatOverlay.css('display') == 'none'){
            squatOverlay.css('display', 'block');
        }
    });
    benchButton.click(function(){
        if(squatOverlay.css('display') != 'none'){
            squatOverlay.css('display', 'none');
        }
        if(deadliftOverlay.css('display') != 'none'){
            deadliftOverlay.css('display', 'none');
        }
        if(benchOverlay.css('display') == 'none'){
            benchOverlay.css('display', 'block');
        }
    });
    deadliftButton.click(function(){
        if(benchOverlay.css('display') != 'none'){
            benchOverlay.css('display', 'none');
        }
        if(squatOverlay.css('display') != 'none'){
            squatOverlay.css('display', 'none');
        }
        if(deadliftOverlay.css('display') == 'none'){
            deadliftOverlay.css('display', 'block');
        }
    });
    


});

//-------------------------------Updating Chart Data ----------------------------------
function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

function updateScales(chart){
    chart.options.scales.yAxes= [{ticks: {min: Math.min(...yWeight), max: Math.max(...yWeight)}}]
    chart.update();
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}

//--------------------------------Chart for Weights------------------------------------
const xWeight = ['Mar 30', 'Mar 31', 'Apr 1', 'Apr 2', 'Apr 3', 'Apr 4', 'Apr 5', 'Apr 6', 'Apr 7', 'Apr 8'] //10 elements probably feasible max, for updating just delete first element and append new date onto the end
const yWeight = [120, 130, 140, 135, 146, 155, 160, 165, 155, 170] //for updating do the same as above
const weightChart = new Chart("weightChart", {
    type: "line",
    data: {
        labels: xWeight,
        datasets: [{
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(0,0,255,1.0)",
            borderColor: "rgba(0,0,255,0.1)",
            data: yWeight
        }]
    },
    options: {
        legend:{display: false},
        scales: {
            yAxes: [{ticks: {min: Math.min(...yWeight), max: Math.max(...yWeight)}}], //Will change y axis min and max based on min and max of the yvalues array
        }
    }
});

//----------------------------------------Chart for Bench Max-------------------------------------
const xBench = ['Apr 4', 'Apr 5', 'Apr 6', 'Apr 7', 'Apr 8'] //10 elements probably feasible max, for updating just delete first element and append new date onto the end
const yBench = [155, 160, 165, 155, 170] //for updating do the same as above
const benchChart = new Chart("benchChart", {
    type: "line",
    data: {
        labels: xBench,
        datasets: [{
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(0,0,255,1.0)",
            borderColor: "rgba(0,0,255,0.1)",
            data: yBench
        }]
    },
    options: {
        legend:{display: false},
        scales: {
            yAxes: [{ticks: {min: Math.min(...yBench), max: Math.max(...yBench)}}], //Will change y axis min and max based on min and max of the yvalues array
        }
    }
});



//-------------------------------------------Chart for squat max--------------------------------------------------------------------------------------------------------
const xSquat = ['Apr 4', 'Apr 5', 'Apr 6', 'Apr 7', 'Apr 8'] //10 elements probably feasible max, for updating just delete first element and append new date onto the end
const ySquat = [150, 150, 150, 155, 170] //for updating do the same as above
const squatChart = new Chart("squatChart", {
    type: "line",
    data: {
        labels: xSquat,
        datasets: [{
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(0,0,255,1.0)",
            borderColor: "rgba(0,0,255,0.1)",
            data: ySquat
        }]
    },
    options: {
        legend:{display: false},
        scales: {
            yAxes: [{ticks: {min: Math.min(...ySquat), max: Math.max(...ySquat)}}], //Will change y axis min and max based on min and max of the yvalues array
        }
    }
});



//-------------------------------------------Chart for deadlift max----------------------------------
const xDeadlift = ['Apr 4', 'Apr 5', 'Apr 6', 'Apr 7', 'Apr 8'] //10 elements probably feasible max, for updating just delete first element and append new date onto the end
const yDeadlift = [ 135, 146, 155, 155, 170] //for updating do the same as above
const deadliftChart = new Chart("deadliftChart", {
    type: "line",
    data: {
        labels: xDeadlift,
        datasets: [{
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(0,0,255,1.0)",
            borderColor: "rgba(0,0,255,0.1)",
            data: yDeadlift
        }]
    },
    options: {
        legend:{display: false},
        scales: {
            yAxes: [{ticks: {min: Math.min(...yDeadlift), max: Math.max(...yDeadlift)}}], //Will change y axis min and max based on min and max of the yvalues array
        }
    }
});





