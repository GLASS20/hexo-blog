const apiUrl = 'https://api.mcstatus.io/v2/status/java/mc.liycxc.link';
const statusChartCanvas = document.getElementById('statusChart').getContext('2d');
const serverIcon = document.getElementById('serverIcon');

async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('获取数据失败：', error);
    }
}

function drawStatusChart(data) {
    const onlinePlayers = data.players.online;
    const maxPlayers = data.players.max;
    const chartData = {
        labels: ['在线玩家', '最大玩家'],
        datasets: [{
            label: '玩家数量',
            data: [onlinePlayers, maxPlayers],
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1
        }]
    };

    const config = {
        type: 'bar',
        data: chartData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    new Chart(statusChartCanvas, config);
}

async function main() {
    const data = await fetchData();
    if (data && data.online) {
        drawStatusChart(data);
    } else {
        console.error('服务器不在线');
    }
}

main();