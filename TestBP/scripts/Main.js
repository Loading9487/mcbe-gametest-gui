import { world } from "mojang-minecraft"
import { ActionFormData } from "mojang-minecraft-ui"

const gui = new ActionFormData()
gui.title('§b§l傳送器 §f| §a§lTeleporter')
gui.body('§d§l選擇傳送的地方 §f| §e§lChoose where to teleport')
gui.button('§e§l銀行 §f| §a§lBank')
gui.button('§a§l商店 | §e§lShop')

world.events.beforeChat.subscribe(data => {
    data.cancel = true
    if (data.sender.hasTag('Snorlax')) {
        data.sender.runCommand(`tellraw @a {"rawtext":[{"text":"§7§l[§9§lSnorlax§7§l] §f${data.sender.name}: ${data.message}"}]}`)
    } else {
        data.sender.runCommand(`tellraw @a {"rawtext":[{"text":"§f§l[§6§lMember§7§l] §f${data.sender.name}: ${data.message}"}]}`)
    }
})

world.events.beforeItemUse.subscribe(data => {
    const source = data.source
    if (data.item.id === 'minecraft:compass') if (data.item.nameTag === '§r§c§l傳送器 §f| §e§lTeleporter') gui.show(source).then(result => {
        if (result.selection === 0) source.runCommand('tp @s -15.415 143 11.0')
        if (result.selection === 1) source.runCommand('tp @s -4 96 0')
    })
})