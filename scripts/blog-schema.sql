-- Blog schema for TudoAgro
-- Run this script in your Supabase SQL editor

-- Create blog_themes table
CREATE TABLE IF NOT EXISTS blog_themes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    color VARCHAR(7) DEFAULT '#10b981', -- emerald-600
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image TEXT,
    theme_id UUID REFERENCES blog_themes(id) ON DELETE SET NULL,
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create saved_posts table (for users to save posts)
CREATE TABLE IF NOT EXISTS saved_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, post_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_theme_id ON blog_posts(theme_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author_id ON blog_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_saved_posts_user_id ON saved_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_posts_post_id ON saved_posts(post_id);

-- Create trigger for updated_at
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE blog_themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_posts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for blog_themes
CREATE POLICY "Anyone can view blog themes" ON blog_themes
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage blog themes" ON blog_themes
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_roles ur
            JOIN roles r ON ur.role_id = r.id
            WHERE ur.user_id = auth.uid() AND r.name = 'admin'
        )
    );

-- RLS Policies for blog_posts
CREATE POLICY "Anyone can view published blog posts" ON blog_posts
    FOR SELECT USING (published = true);

CREATE POLICY "Authors can view their own posts" ON blog_posts
    FOR SELECT USING (auth.uid() = author_id);

CREATE POLICY "Authors can insert their own posts" ON blog_posts
    FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their own posts" ON blog_posts
    FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Authors can delete their own posts" ON blog_posts
    FOR DELETE USING (auth.uid() = author_id);

CREATE POLICY "Admins can manage all blog posts" ON blog_posts
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_roles ur
            JOIN roles r ON ur.role_id = r.id
            WHERE ur.user_id = auth.uid() AND r.name = 'admin'
        )
    );

-- RLS Policies for saved_posts
CREATE POLICY "Users can view their own saved posts" ON saved_posts
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can save posts" ON saved_posts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unsave posts" ON saved_posts
    FOR DELETE USING (auth.uid() = user_id);

-- Insert default themes
INSERT INTO blog_themes (name, slug, description, color) VALUES
('Agricultura', 'agricultura', 'Notícias sobre agricultura e cultivos', '#10b981'),
('Pecuária', 'pecuaria', 'Notícias sobre criação de animais', '#059669'),
('Tecnologia', 'tecnologia', 'Tecnologia no agronegócio', '#0d9488'),
('Mercado', 'mercado', 'Análises de mercado e preços', '#f59e0b'),
('Sustentabilidade', 'sustentabilidade', 'Práticas sustentáveis no campo', '#22c55e'),
('Política Agrícola', 'politica-agricola', 'Políticas públicas e regulamentações', '#3b82f6'),
('Eventos', 'eventos', 'Eventos e feiras do agronegócio', '#8b5cf6'),
('Dicas', 'dicas', 'Dicas e tutoriais para produtores', '#ec4899')
ON CONFLICT (slug) DO NOTHING;
