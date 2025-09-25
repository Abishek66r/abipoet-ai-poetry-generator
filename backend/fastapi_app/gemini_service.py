import google.generativeai as genai
import os
from typing import Optional
# from gemini_service_mock import generate_poem
# Configure Gemini API
# genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
# Configure Gemini API
api_key = "AIzaSyBp3LmAwwMdbemLh4d1e-n7FZIOJBWA0oY"  # Replace with your real API key
genai.configure(api_key=api_key)

genrePrompts = {
    "Haiku": "Write a traditional haiku (5-7-5 syllable structure, exactly 3 lines) about {keywords}. Make it concise and nature-focused.",
    "Sonnet": "Write a Shakespearean sonnet (14 lines, iambic pentameter, ABABCDCDEFEFGG rhyme scheme) about {keywords}.",
    "Limerick": "Write a humorous limerick (5 lines, AABBA rhyme scheme) about {keywords}.",
    "Villanelle": "Write a villanelle (19 lines, 5 tercets followed by a quatrain, with repeating refrains) about {keywords}.",
    "Free Verse": "Write a free verse poem about {keywords}. No strict rhyme or meter required. Write exactly {lineCount} lines.",
    "Ballad": "Write a ballad (quatrains with ABAB rhyme scheme, telling a story) about {keywords}. Write exactly {lineCount} lines.",
    "Ode": "Write an ode (formal lyric poem praising a subject) about {keywords}. Write exactly {lineCount} lines.",
    "Elegy": "Write an elegy (mournful poem, typically about loss) about {keywords}. Write exactly {lineCount} lines.",
    "Epic": "Write a short epic excerpt about {keywords}, using elevated language and heroic themes. Write exactly {lineCount} lines.",
    "Ghazal": "Write a ghazal (5+ couplets with repeating refrain) about {keywords}. Write exactly {lineCount} lines.",
    "Tanka": "Write a tanka (5-7-5-7-7 syllable structure, exactly 5 lines) about {keywords}.",
    "Cinquain": "Write a cinquain (5 lines, 2-4-6-8-2 syllables) about {keywords}.",
    "Acrostic": "Write an acrostic poem where the first letters spell out {keywords}. Write exactly {lineCount} lines.",
    "Concrete/Visual Poetry": "Write a concrete poem where the visual arrangement reflects {keywords}. Write exactly {lineCount} lines.",
    "Blank Verse": "Write blank verse (unrhymed iambic pentameter) about {keywords}. Write exactly {lineCount} lines.",
    "Rhymed Poetry": "Write a rhymed poem with consistent meter about {keywords}. Write exactly {lineCount} lines.",
    "Narrative Poetry": "Write a narrative poem that tells a story about {keywords}. Write exactly {lineCount} lines.",
    "Lyric Poetry": "Write a lyric poem expressing personal feelings about {keywords}. Write exactly {lineCount} lines.",
    "Dramatic Poetry": "Write a dramatic monologue in verse about {keywords}. Write exactly {lineCount} lines.",
    "Satirical Poetry": "Write a satirical poem using humor and irony about {keywords}. Write exactly {lineCount} lines.",
    "Pastoral": "Write a pastoral poem idealizing rural life and nature about {keywords}. Write exactly {lineCount} lines.",
    "Prose Poetry": "Write a prose poem (poetic language without line breaks) about {keywords}. Write exactly {lineCount} lines.",
    "Epigram": "Write a concise, witty epigram about {keywords}. Write exactly {lineCount} lines.",
    "Epitaph": "Write a brief epitaph commemorating {keywords}. Write exactly {lineCount} lines.",
    "Found Poem": "Create a found poem using language related to {keywords}. Write exactly {lineCount} lines.",
    "Pantoum": "Write a pantoum (quatrains with repeating lines) about {keywords}. Write exactly {lineCount} lines.",
    "Sestina": "Write a sestina (6 stanzas of 6 lines, envoi of 3 lines) about {keywords}.",
    "Terza Rima": "Write terza rima (interlocking three-line stanzas, ABA BCB CDC) about {keywords}. Write exactly {lineCount} lines.",
    "Triolet": "Write a triolet (8 lines with repeating refrain) about {keywords}.",
    "Quatrain": "Write a quatrain (4-line stanza) about {keywords}.",
    "Couplet": "Write a rhyming couplet about {keywords}.",
    "Blues Poem": "Write a blues poem following AAB rhyme pattern about {keywords}. Write exactly {lineCount} lines.",
    "Bop": "Write a bop poem with three stanzas about {keywords}.",
    "Cento": "Write a cento (collage poem from existing lines) about {keywords}. Write exactly {lineCount} lines.",
    "Dramatic Monologue": "Write a dramatic monologue in verse about {keywords}. Write exactly {lineCount} lines.",
    "Duplex": "Write a duplex poem with couplets about {keywords}. Write exactly {lineCount} lines.",
    "Ekphrastic": "Write an ekphrastic poem describing art related to {keywords}. Write exactly {lineCount} lines.",
    "Erasure/Blackout": "Create an erasure poem by removing text related to {keywords}. Write exactly {lineCount} lines.",
    "Fable": "Write a verse fable with a moral about {keywords}. Write exactly {lineCount} lines.",
    "Golden Shovel": "Write a golden shovel poem using words from {keywords}. Write exactly {lineCount} lines.",
    "Idyll": "Write an idyll celebrating peaceful rural life about {keywords}. Write exactly {lineCount} lines.",
    "Soliloquy": "Write a soliloquy expressing inner thoughts about {keywords}. Write exactly {lineCount} lines.",
    "Verse Drama": "Write a verse drama excerpt about {keywords}. Write exactly {lineCount} lines.",
    "Verse Novel": "Write a verse novel excerpt about {keywords}. Write exactly {lineCount} lines.",
    "Light Verse": "Write light verse with humor about {keywords}. Write exactly {lineCount} lines.",
    "Confessional Poetry": "Write confessional poetry exploring personal feelings about {keywords}. Write exactly {lineCount} lines.",
    "Speculative Poetry": "Write speculative poetry with imaginative themes about {keywords}. Write exactly {lineCount} lines.",
    "Abecedarian": "Write an abecedarian poem (lines alphabetically ordered) about {keywords}.",
    "Alexandrine": "Write alexandrine verse (12-syllable lines) about {keywords}. Write exactly {lineCount} lines.",
    "Allegory": "Write an allegorical poem with symbolic meaning about {keywords}. Write exactly {lineCount} lines.",
    "Ballade": "Write a ballade (three stanzas and envoy) about {keywords}."
}

async def generate_poem(keywords: str, genre: str, line_count: Optional[int] = None) -> str:
    try:
        # Get genre-specific prompt or use a default
        genre_prompt = genrePrompts.get(genre, f"Write a {genre} poem about {keywords}. Write exactly {line_count or 16} lines.")
        
        # Replace placeholders with actual values
        final_prompt = genre_prompt.replace('{keywords}', keywords)
        if line_count:
            final_prompt = final_prompt.replace('{lineCount}', str(line_count))
        
        # Initialize Gemini model
        # model = genai.GenerativeModel('gemini-pro')
                # Initialize Gemini model (free tier)
        model = genai.GenerativeModel('gemini-1.5-flash')
        
        # Generate poem
        response = model.generate_content(final_prompt)
        poem = response.text.strip()
        
        if not poem:
            raise Exception("No poem generated")
        
        return poem
        
    except Exception as e:
        raise Exception(f"Failed to generate poem: {str(e)}")