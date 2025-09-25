import os
from typing import Optional

# Mock Gemini service for demonstration purposes
# This simulates the Gemini API responses without requiring a real API key

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

# Mock poem templates for different genres
mockPoems = {
    "Haiku": [
        "Golden leaves fall down\nNature whispers in the wind\nPeace fills the quiet soul",
        "Mountain peaks touch sky\nRivers flow through ancient stones\nEarth breathes below us",
        "Cherry blossoms bloom\nSpring arrives with gentle grace\nLife renews again"
    ],
    "Sonnet": [
        "When I behold the beauty of the stars\nThat twinkle in the midnight sky above,\nMy heart is filled with wonder, near and far,\nAnd I am lost in thoughts of endless love.\n\nThe moonlight dances on the water's face,\nReflecting dreams that dwell within my soul,\nAnd in this moment, time and space embrace,\nMaking me feel completely, wholly whole.\n\nThe gentle breeze carries sweet melodies\nOf nature's song, both ancient and yet new,\nAnd in the rustling of the forest trees,\nI find the peace that always sees me through.\n\nSo let me cherish this moment, pure and bright,\nAnd hold it close in memory's soft light."
    ],
    "Limerick": [
        "There once was a poet so bright\nWho wrote poems day and through the night\nWith words so profound\nThey echoed all around\nAnd brought everyone pure delight!"
    ],
    "Free Verse": [
        "The wind whispers secrets\nto the listening trees,\nwhile shadows dance\non the forest floor.\n\nIn this moment of stillness,\nI find myself\nconnected to everything,\npart of the great mystery\nthat surrounds us all."
    ],
    "Ballad": [
        "In ancient times when knights were bold\nAnd stories yet remained untold,\nA maiden fair with hair of gold\nWent forth to seek her destiny's hold.\n\nThrough dark forests and mountains high,\nBeneath the vast and endless sky,\nShe journeyed forth with watchful eye,\nPrepared to live or prepared to die."
    ]
}

async def generate_poem(keywords: str, genre: str, line_count: Optional[int] = None) -> str:
    try:
        # Get genre-specific prompt or use a default
        genre_prompt = genrePrompts.get(genre, f"Write a {genre} poem about {keywords}. Write exactly {line_count or 16} lines.")
        
        # Replace placeholders with actual values
        final_prompt = genre_prompt.replace('{keywords}', keywords)
        if line_count:
            final_prompt = final_prompt.replace('{lineCount}', str(line_count))
        
        # Generate mock poem based on genre
        if genre in mockPoems:
            # Use predefined mock poems
            poem = mockPoems[genre][0]  # Use first poem as template
        else:
            # Generate a generic poem
            poem = f"In the realm of {keywords},\nPoetry takes flight,\nWords dance and sing,\nIn the pale moonlight.\n\n{genre.capitalize()} form guides the way,\nThrough verses bright and gay,\nEach line a step,\nIn this literary display."
        
        # Customize poem with keywords
        poem = poem.replace("stars", keywords.split(',')[0] if ',' in keywords else keywords)
        poem = poem.replace("nature", keywords.split(',')[0] if ',' in keywords else keywords)
        poem = poem.replace("love", keywords.split(',')[0] if ',' in keywords else keywords)
        
        # Add genre-specific formatting
        if genre == "Haiku":
            poem = "Golden dreams take flight\n" + keywords + " whispers in time\nPeace fills waiting hearts"
        elif genre == "Limerick":
            poem = f"There once was a poet so keen\nWho wrote about {keywords} with vim\nTheir words flowed so free\nFor all folk to see\nThe most wonderful verses ever seen!"
        elif genre == "Free Verse":
            poem = f"The essence of {keywords}\nflows through these words\nlike a river through time.\n\nIn the {genre.lower()} form,\nwe find freedom\nexpression\nand truth."
        
        return poem
        
    except Exception as e:
        print(f"Error generating poem: {str(e)}")
        print(f"Keywords: {keywords}")
        print(f"Genre: {genre}")
        print(f"Line count: {line_count}")
        raise Exception(f"Failed to generate poem: {str(e)}")