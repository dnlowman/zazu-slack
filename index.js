import Slack from 'slack-client'

let slackToken = 'token-here'
let autoReconnect = true
let autoMark = true
let slack = new Slack(slackToken, autoReconnect, autoMark)

let connected = false;

slack.on('message', (message) => {
    connected = true;
    let channel = slack.getChannelByName('general')
    console.log(slack.getUserByID(message.user).name)
    if(channel.id === message.channel) {
        if(message.text.indexOf("!standup") > -1) {
            channel.send('@' + slack.getUserByID(message.user).name + ': According to my trusty diary our standups are at 10:00 and 13:00.')
        }
    }
})

setInterval(() => {
    let channel = slack.getChannelByName('general')
    let date = new Date(Date.now())

    if(date.getHours() === 21 && date.getMinutes() === 55 && date.getSeconds() === 0)
        channel.send('@channel: Standup time!')
}, 1000)

slack.login()
