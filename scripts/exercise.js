$(document).ready(function () {
    const exercises = [];

    $("#addExerciseButton").click(function () {
        $(".exerciseHistory").hide();
        $("#addExerciseForm").show();
    });

    $("#goBackButton").click(function () {
        $("#addExerciseForm").hide();
        $(".exerciseHistory").show();
    });

    $("#addExerciseForm").submit(function (e) {
        e.preventDefault();

        const exerciseName = $("#exerciseName").val();
        const weight = $("#weight").val();
        const reps = $("#reps").val();
        const date = $("#date").val();

        if (exerciseName && weight && reps && date) {
            const exercise = {
                name: exerciseName,
                weight: weight,
                reps: reps,
                date: date
            };

            exercises.push(exercise);
            updateRecentExercisesTable(exercise);
            updateExerciseDropdown(exercise);

            $("#exerciseName").val("");
            $("#weight").val("");
            $("#reps").val("");
            $("#date").val("");
        } else {
            alert("Please fill in all the fields");
        }
    });

    $("#exerciseSelection").change(function () {
        const selectedExercise = $(this).val();
        updateSelectedExerciseHistoryTable(selectedExercise);
    });

    function updateRecentExercisesTable(exercise) {
        const row = $("<tr>")
            .append($("<td>").text(exercise.date))
            .append($("<td>").text(exercise.name))
            .append($("<td>").text(exercise.weight))
            .append($("<td>").text(exercise.reps));

        $("#recentExercises tbody").append(row);
    }

    function updateExerciseDropdown(exercise) {
        const existingOption = $("#exerciseSelection option[value='" + exercise.name + "']");
        if (existingOption.length === 0) {
            const option = $("<option>").val(exercise.name).text(exercise.name);
            $("#exerciseSelection").append(option);
        }
    }

    function updateSelectedExerciseHistoryTable(selectedExerciseName) {
        const tbody = $("#selectedExerciseHistory tbody");
        tbody.empty();

        exercises.forEach(function (exercise) {
            if (exercise.name === selectedExerciseName) {
                const row = $("<tr>")
                    .append($("<td>").text(exercise.date))
                    .append($("<td>").text(exercise.weight))
                    .append($("<td>").text(exercise.reps));

                tbody.append(row);
            }
        });
    }
});
