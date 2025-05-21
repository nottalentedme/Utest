import { Start } from './scenes/Start.js';
import { Field } from './scenes/Field.js';
import { tasks } from './data/tasks/tasks.js';
import { BeforeMountain } from './scenes/BeforeMountain.js';
import { Mountain } from './scenes/Mountain.js';
import { HighFlag } from './scenes/HighFlag.js';

const config = {
    type: Phaser.AUTO,
    title: 'Utest',
    description: '',
    parent: 'game-container',
    width: 1920,
    height: 1080,

    pixelArt: false,
    scene: [
        Start, Field, BeforeMountain, Mountain, HighFlag
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
};

export const game = new Phaser.Game(config);

let currentTask = 0;
let correctAnswersCount = 0;  // Счётчик правильных решений
let currentSceneIndex = 0;    // Индекс текущей сцены в scenesOrder
const scenesOrder = ['Field', 'BeforeMountain', 'Mountain', 'HighFlag']; // порядок сцен

let editorInstance;

require.config({ paths: { vs: 'https://unpkg.com/monaco-editor@0.34.1/min/vs' } });
require(['vs/editor/editor.main'], function () {
    editorInstance = monaco.editor.create(document.getElementById('monaco'), {
        value: tasks[currentTask].functionSignature || '',
        language: 'python',
        theme: 'vs-dark',
        automaticLayout: true
    });

    window.editorInstance = editorInstance;

    showCurrentTask();

    // Создаём кнопку переключения подсказки и вставляем под #game-container
    const leftPanel = document.getElementById('left-panel');
    const hintToggleBtn = document.createElement('button');
    hintToggleBtn.id = 'toggle-hint-btn';
    hintToggleBtn.textContent = 'Показать подсказку';
    hintToggleBtn.style.margin = '8px 0 4px 0';
    hintToggleBtn.style.padding = '6px 12px';
    hintToggleBtn.style.borderRadius = '8px';
    hintToggleBtn.style.border = 'none';
    hintToggleBtn.style.backgroundColor = '#00bcd4';
    hintToggleBtn.style.color = 'white';
    hintToggleBtn.style.cursor = 'pointer';
    hintToggleBtn.style.fontSize = '14px';
    hintToggleBtn.style.width = 'fit-content';
    hintToggleBtn.style.userSelect = 'none';

    // Вставляем кнопку между #game-container и #hint
    const gameContainer = document.getElementById('game-container');
    const hintDiv = document.getElementById('hint');
    leftPanel.insertBefore(hintToggleBtn, hintDiv);

    hintDiv.style.display = 'none'; // Скрываем подсказку по умолчанию

    hintToggleBtn.addEventListener('click', () => {
        if (hintDiv.style.display === 'none') {
            hintDiv.style.display = 'block';
            hintToggleBtn.textContent = 'Скрыть подсказку';
        } else {
            hintDiv.style.display = 'none';
            hintToggleBtn.textContent = 'Показать подсказку';
        }
    });
});

export function showCurrentTask() {
    const task = tasks[currentTask];
    if (!task) return;

    document.getElementById('task-description').textContent = task.description || '';
    document.getElementById('task-input').textContent = task.input || '';
    document.getElementById('task-output').textContent = task.output || '';
    document.getElementById('hint').textContent = task.hint || "Подсказка отсутствует.";

    if (window.editorInstance) {
        window.editorInstance.setValue(task.starterCode || task.functionSignature || '');
    }

    // Скрываем подсказку и меняем кнопку при смене задачи
    const hintDiv = document.getElementById('hint');
    const toggleHintBtn = document.getElementById('toggle-hint-btn');
    if (hintDiv && toggleHintBtn) {
        hintDiv.style.display = 'none';
        toggleHintBtn.textContent = 'Показать подсказку';
    }
}

export function goToNextTask() {
    currentTask++;
    if (currentTask < tasks.length) {
        showCurrentTask();
    } else {
        alert('Поздравляем! Все задачи решены.');
        window.editorInstance.setValue('');
        document.getElementById('run-button').disabled = true;
    }
}

let pyodide;

async function initPyodideAndSetup() {
    pyodide = await loadPyodide();

    document.getElementById('run-button').addEventListener('click', async () => {
        const userCode = window.editorInstance.getValue();
        const task = tasks[currentTask];

        try {
            pyodide.globals.clear();

            // Выполняем пользовательский код
            await pyodide.runPythonAsync(userCode);

            // Запускаем тест и ждём результата
            const result = await pyodide.runPythonAsync(task.test);

            // Проверяем корректность результата
            let isCorrect;
            if (typeof task.expected === 'object') {
                // Сравниваем через JSON
                isCorrect = JSON.stringify(result.toJs ? result.toJs() : result)
                    === JSON.stringify(task.expected);
            } else {
                // Иначе просто сравниваем строки
                isCorrect = result.toString() === task.expected.toString();
            }

            if (isCorrect) {
                document.getElementById('result').textContent = '✅ Задача решена правильно!';
                document.getElementById('next-button').style.display = 'inline-block';
                document.getElementById('run-button').disabled = true;

                correctAnswersCount++;

                // Текущая сцена
                const activeSceneKey = scenesOrder[currentSceneIndex];
                const activeScene = game.scene.getScene(activeSceneKey);

                if (activeScene && typeof activeScene.moveHero === 'function') {
                    activeScene.moveHero(300);
                }

                // Если мы на последней сцене (HighFlag)
                if (activeSceneKey === 'HighFlag') {
                    if (correctAnswersCount >= 3) {
                        alert('🎉 Вы молодец! Вы прошли игровой тест Utest!');
                        document.getElementById('run-button').disabled = true;
                        document.getElementById('next-button').style.display = 'none';
                        return; // прекращаем дальнейшие действия
                    }
                } else {
                    // Переход к следующей сцене после 2 правильных ответов на остальных сценах
                    if (correctAnswersCount >= 2) {
                        correctAnswersCount = 0;
                        currentSceneIndex++;

                        if (currentSceneIndex < scenesOrder.length) {
                            game.scene.start(scenesOrder[currentSceneIndex]);
                        } else {
                            console.log('Все сцены пройдены!');
                        }
                    }
                }

            } else {
                document.getElementById('result').textContent = `❌ Неверный результат: ${result}`;

                // Можно уменьшать счетчик при ошибке, если нужно:
                correctAnswersCount = Math.max(0, correctAnswersCount - 1);

                const activeSceneKey = scenesOrder[currentSceneIndex];
                const activeScene = game.scene.getScene(activeSceneKey);
                if (activeScene && typeof activeScene.moveHero === 'function') {
                    activeScene.moveHero(-300);
                }
            }
        } catch (e) {
            console.log(e.message);
        }
    });

    document.getElementById('next-button').addEventListener('click', () => {
        document.getElementById('next-button').style.display = 'none';
        document.getElementById('run-button').disabled = false;
        document.getElementById('result').textContent = '';
        goToNextTask();

        // При переходе к следующей задаче скрываем подсказку и меняем кнопку
        const hintDiv = document.getElementById('hint');
        const toggleHintBtn = document.getElementById('toggle-hint-btn');
        if (hintDiv && toggleHintBtn) {
            hintDiv.style.display = 'none';
            toggleHintBtn.textContent = 'Показать подсказку';
        }
    });
}

initPyodideAndSetup();

document.getElementById('start-button').addEventListener('click', () => {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('editor-container').style.display = 'flex'; // показываем редактор

    // Старт первой сцены
    game.scene.start('Field');
});
