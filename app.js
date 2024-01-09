'use strict'

document.addEventListener('DOMContentLoaded', function () {
    const books = document.querySelectorAll('li');
    let isCtrlPressed = false;
    let lastSelectedIndex = null;

    document.addEventListener('keydown', function (event) {
        isCtrlPressed = event.ctrlKey;
    });

    document.addEventListener('keyup', function () {
        isCtrlPressed = false;
    });

    books.forEach((book, index) => {
        book.addEventListener('click', function (event) {
            const isShiftPressed = event.shiftKey;

            if (!isCtrlPressed && !isShiftPressed) {
                // Якщо натиснута жодна з Ctrl або Shift, очищаємо всі виділення
                books.forEach(b => b.classList.remove('selected'));
            }

            if (isCtrlPressed) {
                // Виділення/зняття виділення для Ctrl
                book.classList.toggle('selected');
            } else if (isShiftPressed && lastSelectedIndex !== null) {
                // Додавання/зняття виділення для Shift
                let startIdx = Math.min(lastSelectedIndex, index);
                let endIdx = Math.max(lastSelectedIndex, index);

                for (let i = startIdx; i <= endIdx; i++) {
                    books[i].classList.add('selected');
                }
            } else {
                // Якщо не натиснута жодна з Ctrl або Shift, просто виділяємо поточний елемент
                book.classList.add('selected');
            }

            lastSelectedIndex = index;
        });
    });
});