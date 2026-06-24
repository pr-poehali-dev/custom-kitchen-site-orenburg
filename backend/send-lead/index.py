import json
import os
import urllib.request
import urllib.parse


def handler(event: dict, context) -> dict:
    '''
    Принимает заявку на замер с сайта и отправляет её в Telegram.
    Args: event - dict с httpMethod, body (name, phone, source)
          context - объект с request_id
    Returns: HTTP-ответ со статусом отправки
    '''
    method = event.get('httpMethod', 'GET')

    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'}),
        }

    body_data = json.loads(event.get('body', '{}') or '{}')
    name = str(body_data.get('name', '')).strip()
    phone = str(body_data.get('phone', '')).strip()
    source = str(body_data.get('source', 'Сайт')).strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Укажите имя и телефон'}),
        }

    token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID', '')

    if not token or not chat_id:
        return {
            'statusCode': 500,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Telegram не настроен'}),
        }

    text = (
        '🔔 Новая заявка на замер!\n\n'
        f'👤 Имя: {name}\n'
        f'📞 Телефон: {phone}\n'
        f'📍 Источник: {source}'
    )

    tg_url = f'https://api.telegram.org/bot{token}/sendMessage'
    payload = urllib.parse.urlencode({
        'chat_id': chat_id,
        'text': text,
    }).encode('utf-8')

    req = urllib.request.Request(tg_url, data=payload, method='POST')
    with urllib.request.urlopen(req, timeout=10) as resp:
        resp.read()

    return {
        'statusCode': 200,
        'headers': {**cors_headers, 'Content-Type': 'application/json'},
        'body': json.dumps({'success': True}),
    }
