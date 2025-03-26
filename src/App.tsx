import React, {CSSProperties} from "react";

function App() {

    const [wishList, setWishList] = React.useState<string[]>([]);
    const [inputText, setInputText] = React.useState<string>("");

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInputText(e.target.value);
    };

    function addWish() {
        if (inputText.trim()) {
            setWishList([...wishList, inputText]);
            setInputText('');
        };
    };

    function removeWish(index: number) {
        setWishList(wishList.filter((_, i) => i !== index));
    };

    const styles: { [key: string]: CSSProperties } = {
        container: {
            // Стилизуем простенький контейнер, чтобы выделить компонент и отобразить по центру страницы.
            maxWidth: "600px",
            margin: "30px auto",
            textAlign: "center",
            padding: "15px",
            border: "2px solid #ddd",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
        input: {
            // Стилизуем Инпут, чтобы уйти от стандартного (не красивого) отображения на странице.
            padding: "10px",
            marginRight: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
        },
        button: {
            // Стилизуем кнопки, чтобы они визуально сочетались с Инпутом.
            padding: "10px 12px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
        },
        list: {
            // Стилизуем список.
            listStyleType: "none",    // Убираем дефолтные маркеры.
            padding: 0,               // Убираем дефолтные отступы.
        },
        listItem: {
            // Стилизуем элементы списка. С помощью флекс-бокса расставляем желания и кнопки "красиво".
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 0",
        },
    };

    return (
        <div style={styles.container}>
            <input
                type="text"
                value={inputText}
                onChange={handleInputChange}
                placeholder="Введите желание..."
                style={styles.input}
            />
            <button onClick={addWish} style={styles.button}>Добавить</button>

            {wishList.length === 0 ? (
                <p>Пока желаний нет</p>
            ) : (
                <ul style={styles.list}>
                    {wishList.map((wish, index) => (
                        <li key={index} style={styles.listItem}>
                            {wish}
                            <button onClick={() => removeWish(index)} style={styles.button}>Удалить</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default App;

// В рамках данного компонента для работы с API, я бы использовал useEffect и fetch.
// При загрузке компонента в useEffect можно делать запрос к API, для полученя списка желаний.
// И устанавливать его через setWishList. Функию addWish я бы изменил таким образом,
// чтобы она отправляла post - запрос к серверу, добавляя желание в базу данных.
// Функция removeWish, всвою очередь, должна будет отправлять delete - запрос на бэк,
// удаляя конкретное желание.