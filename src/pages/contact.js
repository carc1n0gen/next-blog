import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'


export default function Contact() {
  const router = useRouter()
  const [subject, setSubject] = useState('Blog contact form submition')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const nameOnChange = useCallback(({ target }) => {
    setSubject(`Blog contact form submission from ${target.value}`)
    setName(target.value)
  }, [setSubject])

  const onSubmit = useCallback(async (event) => {
    event.preventDefault()

    const data = new FormData(event.target)
    try {
      const response = await fetch(event.target.action, {
        method: event.target.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        router.push('/thanks')
      } else {
        throw new Error(await response.text())
      }
    } catch (error) {
      console.error('Uh oh!')
      console.error(error)
      router.push('/uhoh')
    }
  }, [router])

  return (
    <section className="card">
      <Head>
        <title>Contact | Carson's Blog</title>
      </Head>
      <p>Fill out this form to send me an email, and I will get back to you ASAP.</p>
      <form action={`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORM_SPREE_ID}`} method="POST" className="form" onSubmit={onSubmit}>
        <input type="hidden" name="subject" value={subject} />

        <label htmlFor="name">Name</label>
        <input type="text" name="name" value={name} onChange={nameOnChange} required />

        <label htmlFor="email">Email</label>
        <input type="email" name="email" value={email} onChange={({ target }) => setEmail(target.value)} />

        <label htmlFor="message" name="message">Message</label>
        <textarea name="message" rows="10" value={message} onChange={({ target }) => setMessage(target.value)}></textarea>

        <div className="form-controls">
          <div className="g-recaptcha" data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}></div>
          <button type="submit">
            <i className="fa fa-paper-plane" aria-hidden="true"></i>
            Send
          </button>
        </div>
      </form>
    </section>
  )
}
