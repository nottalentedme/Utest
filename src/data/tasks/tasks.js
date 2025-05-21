export const tasks = [
  {
    id: 1,
    title: "Сумма двух чисел",
    description: "Напиши функцию, которая принимает два целых числа и возвращает их сумму.",
    input: "a, b — два целых числа",
    output: "Сумма чисел a и b",
    difficulty: "easy",
    functionSignature: "def sum_two_numbers(a, b):",
    test: "sum_two_numbers(2, 3)",
    expected: 5,
    hint: "Используй оператор + для сложения двух чисел."
  },
  {
    id: 2,
    title: "Проверка на чётность",
    description: "Напиши функцию, которая возвращает True, если число чётное, иначе False.",
    input: "n — целое число",
    output: "True или False",
    difficulty: "easy",
    functionSignature: "def is_even(n):",
    test: "is_even(4)",
    expected: true,
    hint: "Чётное число делится на 2 без остатка. Используй оператор %."
  },
  {
    id: 3,
    title: "Факториал числа",
    description: "Напиши функцию, которая возвращает факториал переданного числа.",
    input: "n — неотрицательное целое число",
    output: "Факториал n",
    difficulty: "easy",
    functionSignature: "def factorial(n):",
    test: "factorial(5)",
    expected: 120,
    hint: "Факториал n — произведение всех чисел от 1 до n. Используй рекурсию или цикл."
  },
  {
    id: 4,
    title: "Поиск максимума",
    description: "Напиши функцию, которая возвращает максимальное число из списка.",
    input: "lst — список целых чисел",
    output: "Максимальное число из списка",
    difficulty: "medium",
    functionSignature: "def find_max(lst):",
    test: "find_max([1, 3, 7, 2])",
    expected: 7,
    hint: "Используй встроенную функцию max или перебери элементы, запоминая максимальный."
  },
  {
    id: 5,
    title: "Проверка на палиндром",
    description: "Напиши функцию, которая проверяет, является ли строка палиндромом.",
    input: "s — строка",
    output: "True, если строка палиндром, иначе False",
    difficulty: "medium",
    functionSignature: "def is_palindrome(s):",
    test: "is_palindrome('madam')",
    expected: true,
    hint: "Палиндром читается одинаково слева направо и справа налево. Сравни строку с её обратной."
  },
  {
    id: 6,
    title: "Частота слов",
    description: "Напиши функцию, которая считает частоту каждого слова в строке и возвращает словарь.",
    input: "text — строка слов, разделённых пробелами",
    output: "Словарь с частотами слов",
    difficulty: "medium",
    functionSignature: "def word_frequency(text):",
    test: "word_frequency('apple banana apple')",
    expected: "ooo",
    hint: "Разбей строку по пробелам и подсчитай количество вхождений каждого слова."
  },
  {
    id: 7,
    title: "Фибоначчи рекурсивно",
    description: "Напиши рекурсивную функцию, которая возвращает n-е число Фибоначчи.",
    input: "n — неотрицательное целое число",
    output: "n-е число Фибоначчи",
    difficulty: "medium",
    functionSignature: "def fibonacci(n):",
    test: "fibonacci(6)",
    expected: 8,
    hint: "Число Фибоначчи равно сумме двух предыдущих. Используй рекурсию с базовыми случаями n=0 и n=1."
  },
  {
    id: 8,
    title: "Сортировка пузырьком",
    description: "Реализуй сортировку пузырьком для списка чисел.",
    input: "arr — список чисел",
    output: "Отсортированный список",
    difficulty: "hard",
    functionSignature: "def bubble_sort(arr):",
    test: "bubble_sort([4, 2, 3, 1])",
    expected: [1, 2, 3, 4],
    hint: "Проходи по списку, меняя местами соседние элементы, если они идут не по возрастанию."
  },
  {
    id: 9,
    title: "Судоку валидатор",
    description: "Напиши функцию, которая проверяет, корректно ли заполнена доска Судоку.",
    input: "board — двумерный список 9x9",
    output: "True, если доска корректна, иначе False",
    difficulty: "hard",
    functionSignature: "def is_valid_sudoku(board):",
    test: "is_valid_sudoku([[5,3,0,0,7,0,0,0,0],...])", // Укорочено
    expected: true,
    hint: "Проверяй, что в каждой строке, столбце и 3x3 блоке нет повторяющихся чисел."
  },
  {
    id: 10,
    title: "Поиск пути в лабиринте (DFS)",
    description: "Реализуй поиск пути в двумерном массиве (лабиринте) с помощью DFS.",
    input: "maze — список списков, где 0 — проход, 1 — стена; start и end — координаты",
    output: "True, если путь существует, иначе False",
    difficulty: "hard",
    functionSignature: "def path_exists(maze, start, end):",
    test: "path_exists([[0,1,0],[0,0,0],[1,0,1]], (0,0), (2,2))",
    expected: false,
    hint: "Используй обход в глубину (DFS), чтобы найти путь от start до end, избегая стен."
  }
];
